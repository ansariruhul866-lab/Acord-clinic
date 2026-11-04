// patch-fs.js - Automatically retries fs and fs/promises operations on Windows file-lock race conditions
const fs = require('fs');
const promises = require('fs/promises');

function isLockError(err) {
  if (!err) return false;
  return (
    err.code === 'UNKNOWN' ||
    err.errno === -4094 ||
    err.code === 'EPERM' ||
    err.errno === -4048 ||
    err.code === 'EBUSY'
  );
}

function sleepSync(ms) {
  try {
    const sab = new Int32Array(new SharedArrayBuffer(4));
    Atomics.wait(sab, 0, 0, ms);
  } catch (_) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
  }
}

// 1. Patch fs.openSync
const origOpenSync = fs.openSync;
fs.openSync = function (path, flags, mode) {
  let attempts = 0;
  while (true) {
    try {
      return origOpenSync.call(fs, path, flags, mode);
    } catch (err) {
      if (isLockError(err) && attempts < 15) {
        attempts++;
        sleepSync(30 * attempts);
        continue;
      }
      throw err;
    }
  }
};

// 2. Patch fs.open
const origOpen = fs.open;
fs.open = function (path, flags, mode, callback) {
  if (typeof mode === 'function') {
    callback = mode;
    mode = undefined;
  }
  let attempts = 0;
  function tryOpen() {
    origOpen.call(fs, path, flags, mode, (err, fd) => {
      if (err && isLockError(err) && attempts < 15) {
        attempts++;
        setTimeout(tryOpen, 30 * attempts);
        return;
      }
      if (callback) callback(err, fd);
    });
  }
  tryOpen();
};

// 3. Patch fs.readFileSync
const origReadFileSync = fs.readFileSync;
fs.readFileSync = function (path, options) {
  let attempts = 0;
  while (true) {
    try {
      return origReadFileSync.call(fs, path, options);
    } catch (err) {
      if (isLockError(err) && attempts < 15) {
        attempts++;
        sleepSync(30 * attempts);
        continue;
      }
      throw err;
    }
  }
};

// 4. Patch fs.writeFileSync
const origWriteFileSync = fs.writeFileSync;
fs.writeFileSync = function (path, data, options) {
  let attempts = 0;
  while (true) {
    try {
      return origWriteFileSync.call(fs, path, data, options);
    } catch (err) {
      if (isLockError(err) && attempts < 15) {
        attempts++;
        sleepSync(30 * attempts);
        continue;
      }
      throw err;
    }
  }
};

// 5. Patch fs/promises.writeFile
const origPromisesWriteFile = promises.writeFile;
promises.writeFile = async function (path, data, options) {
  let attempts = 0;
  while (true) {
    try {
      return await origPromisesWriteFile.call(promises, path, data, options);
    } catch (err) {
      if (isLockError(err) && attempts < 15) {
        attempts++;
        await new Promise((r) => setTimeout(r, 40 * attempts));
        continue;
      }
      throw err;
    }
  }
};

// 6. Patch fs/promises.readFile
const origPromisesReadFile = promises.readFile;
promises.readFile = async function (path, options) {
  let attempts = 0;
  while (true) {
    try {
      return await origPromisesReadFile.call(promises, path, options);
    } catch (err) {
      if (isLockError(err) && attempts < 15) {
        attempts++;
        await new Promise((r) => setTimeout(r, 40 * attempts));
        continue;
      }
      throw err;
    }
  }
};

// 7. Patch fs/promises.open
const origPromisesOpen = promises.open;
promises.open = async function (path, flags, mode) {
  let attempts = 0;
  while (true) {
    try {
      return await origPromisesOpen.call(promises, path, flags, mode);
    } catch (err) {
      if (isLockError(err) && attempts < 15) {
        attempts++;
        await new Promise((r) => setTimeout(r, 40 * attempts));
        continue;
      }
      throw err;
    }
  }
};
