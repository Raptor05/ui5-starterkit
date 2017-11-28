"use strict";

module.exports = function (grunt) {

    // Project properties
    var webAppDir = "WebContent";
    var targetDir = "target";
    var tmpDir = targetDir + "/tmp";
    var tmpDirDbg = targetDir + "/tmp-dbg";
    var zipFileSuffix = "-opt-static-abap.zip";
    var preloadPrefix = "nw/epm/refapps/ext/shop";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        clean: {
            build: [targetDir]
        },
        encoding: {
            options: {
                encoding: "UTF8"
            },
            files: {
                src: [webAppDir + "/**/*.js", webAppDir + "/**/*.css",
                    webAppDir + "/**/*.xml", webAppDir + "/**/*.json",
                    webAppDir + "/**/*.html", webAppDir + "/**/*.properties"]
            }
        },
        eslint: {
            options: {
                configFile: ".eslintrc.json"
            },
            target: [webAppDir + "/**/*.js"]
        },
        copy: {
            copyToDbg: {
                files: [
                    {
                        expand: true,
                        src: "**/*.js",
                        dest: tmpDirDbg,
                        cwd: webAppDir,
                        filter: function (filepath) {
                            // prevent js from localService to be copied
                            return !filepath.match(new RegExp(webAppDir + "(\\/|\\\\)localService", "gi"));
                        }
                    },
                    {
                        expand: true,
                        src: "**/*.css",
                        dest: tmpDirDbg,
                        cwd: webAppDir
                    }]
            },
            copyToTmp: {
                files: [
                    {
                        expand: true,
                        src: "**/*.js",
                        dest: tmpDir,
                        cwd: webAppDir,
                        filter: function (filepath) {
                            // prevent js from localService to be copied
                            return !filepath.match(new RegExp(webAppDir + "(\\/|\\\\)localService", "gi"));
                        }
                    },
                    {
                        expand: true,
                        src: "**/*.css",
                        dest: tmpDir,
                        cwd: webAppDir
                    },
                    {
                        expand: true,
                        src: "localService/metadata.xml",
                        dest: tmpDir,
                        cwd: webAppDir
                    },
                    {
                        expand: true,
                        src: "**/*",
                        dest: tmpDir,
                        cwd: webAppDir,
                        filter: function (filepath) {
                            // prevent js and css files and contents of webapp/test from being copied
                            return !filepath.match(new RegExp("(" + webAppDir + "(\\/|\\\\)test|${webAppDir}(\\/|\\\\)localService|\\.js$|\\.css$|\\test.html$)", "gi"));
                        }
                    }]
            },
            copyDbgToTmp: {
                files: [
                    {
                        expand: true,
                        src: "**/*.js",
                        dest: tmpDir,
                        cwd: tmpDirDbg,
                        rename: function (dest, src) {
                            return dest + "/" + src.replace(/((\.view|\.fragment|\.controller)?\.js)/, "-dbg$1");
                        }
                    },
                    {
                        expand: true,
                        src: "**/*.css",
                        dest: tmpDir,
                        cwd: tmpDirDbg,
                        rename: function (dest, src) {
                            return dest + "/" + src.replace(".css", "-dbg.css");
                        }
                    }]
            }
        },
        uglify: {
            uglifyTmp: {
                files: [
                    {
                        expand: true,
                        src: "**/*.js",
                        dest: tmpDir,
                        cwd: webAppDir,
                        filter: function (filepath) {
                            // prevent js from localService to be copied
                            return !filepath.match(new RegExp(webAppDir + "(\\/|\\\\)localService", "gi"));
                        }
                    }]
            },
            uglifyPreload: {
                files: [
                    {
                        expand: true,
                        src: tmpDir + "/Component-preload.js"
                    }]
            }
        },
        cssmin: {
            build: {
                files: [
                    {
                        expand: true,
                        src: "**/*.css",
                        dest: tmpDir,
                        cwd: webAppDir
                    }]
            }
        },
        openui5_preload: {
            preloadDbg: {
                options: {
                    resources: {
                        cwd: tmpDirDbg,
                        src: ["**/*.js"],
                        prefix: preloadPrefix
                    },
                    compress: false,
                    dest: tmpDirDbg
                },
                components: true
            },
            preloadTmp: {
                options: {
                    resources: {
                        cwd: tmpDir,
                        src: ["**/*.js"],
                        prefix: preloadPrefix
                    },
                    compress: false,
                    dest: tmpDir
                },
                components: true
            }
        },
        zip: {
            build: {
                cwd: tmpDir,
                src: tmpDir + "/**/*",
                dest: targetDir + "/<%= pkg.name %>" + zipFileSuffix
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks("grunt-encoding");
    grunt.loadNpmTasks("grunt-zip");
    grunt.loadNpmTasks("grunt-openui5");
    grunt.loadNpmTasks("grunt-nexus-deployer");
    grunt.loadNpmTasks("grunt-eslint");

    grunt.registerTask("default", ["clean", "copy:copyToDbg", "openui5_preload:preloadDbg", "copy:copyToTmp",
        "uglify:uglifyTmp", "cssmin", "openui5_preload:preloadTmp", "copy:copyDbgToTmp",
        "uglify:uglifyPreload"]);
    grunt.registerTask("createZip", ["zip"]);
    grunt.registerTask("deployToNexus", ["nexusDeployer"]);
};
