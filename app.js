#!/usr/bin/env node
(async function () {
    var process = require("process");
    console.log("[Nodegames-forge] Getting dependencies...")
    var child_process = require('child_process');
    var execSync = child_process.execSync;
    var args = process.argv.slice(2);

    var npm = function (args) {
        var npmCmd = /^win/.test(process.platform) ? "npm.cmd" : "npm";
        var command = npmCmd + " " + args.join(" ");

        try {
            execSync(command);
        }
        catch (error) {
            return 1;
        }
    }

    var easynodes; //easynodes@1.0.1
    try {
        easynodes = require("easynodes");
    }
    catch (error) {
        console.log("[Nodegames-forge] Vital dependency: easynodes@1.0.1 is missing, installing...")
        var returns = npm(["install", "easynodes@1.0.1"])
        if (returns === 1) {
            throw "[Nodegames-forge] Unable to install vital dependency: easynodes@1.0.1."
        }
        else {
            try {
                easynodes = require("easynodes");
                console.log("[Nodegames-forge] Vital dependency: easynodes@1.0.1 installed.")
            }
            catch (error) {
                throw "[Nodegames-forge] Unable to install vital dependency: easynodes@1.0.1."
            }
        }
    }
    easynodes.init();

    var nexe; //nexe@4.0.0-rc.2
    try {
        nexe = require("nexe");
    }
    catch (error) {
        console.log("[Nodegames-forge] Vital dependency: nexe@4.0.0-rc.2 is missing, installing...")
        var returns = npm(["install", "nexe@4.0.0-rc.2"])
        if (returns === 1) {
            throw "[Nodegames-forge] Unable to install vital dependency: nexe@4.0.0-rc.2."
        }
        else {
            try {
                nexe = require("nexe");
                console.log("[Nodegames-forge] Vital dependency: nexe@4.0.0-rc.2 installed.")
            }
            catch (error) {
                throw "[Nodegames-forge] Unable to install vital dependency: nexe@4.0.0-rc.2."
            }
        }
    }
    console.log("[Nodegames-forge] Got dependencies.")
    console.log("[Nodegames-forge] Checking command aguments...");
    var build = false;
    var versionType = 64
    if (args[0] === "64" || args[0] === "64bit" || args[0] === "x64") {
        versionType = 64
    }
    else {
        if (args[0] === "32" || args[0] === "32bit" || args[0] === "x86") {
            versionType = 32
        }
        else {
            if (args[0] == null) {
                console.log("[Nodegames-forge] No command arguments found, using default: 64bit.")
            }
            else {
                if (args[0] === "--help" || args[0] === "-?") {
                    console.log("[Nodegames-forge] Command arguments checked.")
                        console.log("[Nodegames-forge] ----- Help -----")
                        console.log("                  nodegames-forge [64, 64bit, x64, 32, 32bit, x86, --help, --build, -?]")
                        console.log("                  nodegamesjs-forge [64, 64bit, x64, 32, 32bit, x86, --help, --build, -?]")
                        console.log("")
                        console.log("                  Exemples:")
                        console.log("                      nodegames-forge 64")
                        console.log("                      nodegames-forge 32")
                        console.log("                      nodegames-forge --help")
                        console.log("                      nodegames-forge --build")
                        console.log("                      nodegames-forge") 
                        console.log("                      nodegamesjs-forge 64")
                        console.log("                      nodegamesjs-forge 32")
                        console.log("                      nodegamesjs-forge --help")
                        console.log("                      nodegamesjs-forge --build")
                        console.log("                      nodegamesjs-forge")
                        console.log("")
                        console.log("                  64, 64bit, x64: 64bit version")
                        console.log("                  32, 32bit, x86: 32bit version")
                        console.log("                  --help, -?: Help")
                        console.log("                  --build: Build an executable that works on your machine")
                        console.log("                  ----- Help -----")
                    process.exit(0);
                }
                else {
                    if (args[0] === "--build"){
                        build = true;
                    }
                    else{
                        console.log("[Nodegames-forge] Invalid command argument.")
                        console.log("[Nodegames-forge] ----- Help -----")
                        console.log("                  nodegames-forge [64, 64bit, x64, 32, 32bit, x86, --help, --build, -?]")
                        console.log("                  nodegamesjs-forge [64, 64bit, x64, 32, 32bit, x86, --help, --build, -?]")
                        console.log("")
                        console.log("                  Exemples:")
                        console.log("                      nodegames-forge 64")
                        console.log("                      nodegames-forge 32")
                        console.log("                      nodegames-forge --help")
                        console.log("                      nodegames-forge --build")
                        console.log("                      nodegames-forge") 
                        console.log("                      nodegamesjs-forge 64")
                        console.log("                      nodegamesjs-forge 32")
                        console.log("                      nodegamesjs-forge --help")
                        console.log("                      nodegamesjs-forge --build")
                        console.log("                      nodegamesjs-forge")
                        console.log("")
                        console.log("                  64, 64bit, x64: 64bit version")
                        console.log("                  32, 32bit, x86: 32bit version")
                        console.log("                  --help, -?: Help")
                        console.log("                  --build: Build an executable that works on your machine")
                        console.log("                  ----- Help -----")
                        process.exit(1);
                    }
                }
            }
        }
    }

    var arch = versionType
    versionType = null;
    console.log("[Nodegames-forge] Command arguments checked.")
    console.log("[Nodegames-forge] Checking if directory \"output\" exists...");
    if (easynodes.files.exists.sync("output")) {
        console.log("[Nodegames-forge] Directory \"output\" exists, cannot create it to store build files.");
        console.log("[Nodegames-forge] Please delete the directory \"output\" and restart the build.");
        process.exit(1);
    }
    else {
        console.log("[Nodegames-forge] Directory \"output\" does not exists, creating it...");
        easynodes.files.create.folder.sync("output");
        console.log("[Nodegames-forge] Directory \"output\" created.");
        console.log("[Nodegames-forge] Checking if file \"package.json\" exists in current directory...");
        if (easynodes.files.exists.sync("package.json")) {
            console.log("[Nodegames-forge] File \"package.json\" exists in current directory.");
            console.log("[Nodegames-forge] Reading file \"package.json\"...");
            var packagejson
            try {
                packagejson = easynodes.files.read.sync("package.json");
            }
            catch (error) {
                console.log("[Nodegames-forge] Error while reading file \"package.json\".")
                process.exit(1);
            }
            console.log("[Nodegames-forge] File \"package.json\" read.");
            console.log("[Nodegames-forge] Resolving data from file \"package.json\"...");
            var packagejsondata
            try {
                packagejsondata = JSON.parse(packagejson);
            }
            catch (error) {
                console.log("[Nodegames-forge] Error while resolving data from file \"package.json\".")
                process.exit(1);
            }
            console.log("[Nodegames-forge] Data from file \"package.json\" resolved.");
            console.log("[Nodegames-forge] Checking if file \"package.json\" contains \"main\" info...");
            if (packagejsondata.main == null) {
                console.log("[Nodegames-forge] File \"package.json\" does not contains \"main\" info.");
                console.log("[Nodegames-forge] Please add \"main\" info to \"package.json\" and restart the build.");
                process.exit(1);
            }
            else {
                var main = packagejsondata.main;
                console.log("[Nodegames-forge] File \"package.json\" contains \"main\" info.");
                console.log("[Nodegames-forge] Checking if file in \"main\" info exists...");
                if (easynodes.files.exists.sync(main)) {
                    console.log("[Nodegames-forge] File in \"main\" info exists.");
                    console.log("[Nodegames-forge] Checking if file in \"main\" info is a directory...");
                    if (easynodes.files.getTypeOf.sync(main) === "Folder") {
                        //It's a folder, there is a problem
                        console.log("[Nodegames-forge] File in \"main\" info is a directory.");
                        console.log("[Nodegames-forge] Please change \"main\" info to a file and restart the build.");
                        process.exit(1);
                    }
                    else {
                        console.log("[Nodegames-forge] File in \"main\" info is not a directory.");
                    }
                }
                else {
                    console.log("[Nodegames-forge] File in \"main\" info does not exists.");
                    console.log("[Nodegames-forge] Please change \"main\" info to a file and restart the build.");
                    process.exit(1);
                }
                console.log("[Nodegames-forge] Everything's ready...");
            }
        }
        else {
            console.log("[Nodegames-forge] File \"package.json\" does not exists in current directory.");
            console.log("[Nodegames-forge] Please create \"package.json\" and restart the build.");
            process.exit(1);
        }
        console.log("[Nodegames-forge] Starting build...");
    }
    var basemain = main
    if (main.endsWith(".js")) {
        main = main.slice(0, -3)
    }
    if (build === false){
        console.log("[Nodegames-forge] [Build] Creating executable for linux as \"linux-" + main + "\"...");
        try {
            await nexe.compile({
                "input": main,
                "target": "linux-" + (arch === 64 ? "x64" : "x86") + "-12.0.0",
                "output": "output/linux-" + main,
            })
        }
        catch (error) {
            console.log("[Nodegames-forge] [Build] Error while creating executable for linux as \"linux-" + main + "\".")
            process.exit(1);
        }
        console.log("[Nodegames-forge] [Build] Executable for linux as \"linux-" + main + "\" created.")
        console.log("[Nodegames-forge] [Build] Creating executable for windows as \"windows-" + main + "\"...");
        try {
            await nexe.compile({
                "input": main,
                "target": "windows-" + (arch === 64 ? "x64" : "x86") + "-12.0.0",
                "output": "output/windows-" + main + ".exe",
            })
        }
        catch (error) {
            console.log("[Nodegames-forge] [Build] Error while creating executable for windows as \"windows-" + main + "\".")
            process.exit(1);
        }
        console.log("[Nodegames-forge] [Build] Executable for windows as \"windows-" + main + "\" created.")
        console.log("[Nodegames-forge] [Build] Creating executable for mac as \"mac-" + main + "\"...");
        try {
            await nexe.compile({
                "input": main,
                "target": "mac-x64-12.0.0",
                "output": "output/mac-" + main,
            })
        }
        catch (error) {
            console.log("[Nodegames-forge] [Build] Error while creating executable for mac as \"mac-" + main + "\".")
            process.exit(1);
        }
        console.log("[Nodegames-forge] [Build] Executable for mac as \"mac-" + main + "\" created.")
        console.log("[Nodegames-forge] [Build] Built all executables successfully.")
        process.exit(0);
    }
    else{
        console.log("[Nodegames-forge] [Build] Creating executable for your machine as \"" + main + "\"...");
        try {
            await nexe.compile({
                "input": main,
                "build": true,
                "output": "output/" + main + ".exe",
            })
        }
        catch (error) {
            console.log("[Nodegames-forge] [Build] Error while creating executable for your machine as \"" + main + "\".")
            process.exit(1);
        }
        console.log("[Nodegames-forge] [Build] Executable for your machine as \"" + main + "\" created.")
        console.log("[Nodegames-forge] [Build] Built executable successfully.")
        process.exit(0);
    }
})()