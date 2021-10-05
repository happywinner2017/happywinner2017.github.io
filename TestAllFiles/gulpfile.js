let project_folder="dist";
let source_folder="#src";
let path={
    build:{
        html: project_folder+"/",
        css: project_folder+"/css/",
        js: project_folder+"/js/",
        fonts: project_folder+"/fonts/"
    },
    src:{
        html: source_folder+"/*.html",
        css: source_folder+"/scss/style.scss",
        js: source_folder+"/js/script.js",
        fonts: source_folder+"/fonts/*.ttf"
    },
    watch:{
        html: source_folder+"/**/*.html",
        css: source_folder+"/scss/**/*.scss",
        js: source_folder+"/js/*.js"
    },
    clean: "./"+project_folder+"/"
}

let {src,  dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    scss = require('gulp-sass')(require('sass')),
    autoprefixer = require('gulp-autoprefixer'),
    clean_css = require('gulp-clean-css'),
    remame = require('gulp-rename');

function browserSync(params){
    browsersync.init({
        server:{
            baseDir: "./"+project_folder+"/"
        },
        port: 3000,
        notify: false
    })
}
function html(){
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}
function css(){
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(autoprefixer({
            overrideBrowserslist: ["last 5 versions"],
            cascade: true
        }))
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(remame({
            extname: ".min.css"
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}
function js(){
    return src(path.src.js)
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}
function fonts(){
    return src(path.src.fonts)
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}
function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}
let build=gulp.series(gulp.parallel(js, css, html, fonts));
let watch=gulp.parallel(build, watchFiles, browserSync);

exports.fonts=fonts;
exports.js=js;
exports.css=css;
exports.html=html;
exports.build=build;
exports.watch=watch;
exports.default=watch;