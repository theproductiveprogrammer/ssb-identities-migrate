'use strict'
const fs = require('fs')
const path = require('path')
const leftpad = require('left-pad')

/*      outcome/
 * Migrate the keys from `old` to `new` ssb identities format
 */
function main() {
    if(process.argv.length != 4) return showHelp()
    migrate(process.argv[2], process.argv[3])
}

/*      understand/
 * In the old version the identities were stored in folders under the
 * `data` folder with the name `ssb-key`. In the new version the
 * identities are stored under `data/__ssb/identities`.
 *
 *      outcome/
 * Walk the old `data` directory and look for `<subdir>/ssb-key`. If
 * found, copy it to the new `data/__ssb/identities` directory with the
 * name `secret_xx.butt`
 */
function migrate(from, to) {
    fs.readdir(from, (err, old) => {
        if(err) console.error(err)
        else {
            console.log(old)
            migrate_ndx_1(old, 0)
        }
    })

    function migrate_ndx_1(old, ndx) {
        if(ndx >= old.length) return
        let srcloc = path.join(from, old[ndx], 'ssb-key')
        fs.lstat(srcloc, (err, stat) => {
            if(err) {
                if(err.code == 'ENOENT') migrate_ndx_1(old, ndx+1)
                else console.error(err)
            } else {
                if(!stat.isFile()) migrate_ndx_1(old, ndx+1)
                else {
                    let dstname = 'secret_'+leftpad(ndx, 2, '0')+'.butt'
                    let dstloc = path.join(to, '__ssb', 'identities', dstname)
                    fs.copyFile(srcloc, dstloc, (err) => {
                        if(err) console.error(err)
                        else {
                            console.log(`Migrated ${old[ndx]} as ${dstname}`)
                            migrate_ndx_1(old, ndx+1)
                        }
                    })
                }
            }
        })
    }
}

function showHelp() {
    console.log(`Usage: <src data dir> <dst data dir>`)
}

main()
