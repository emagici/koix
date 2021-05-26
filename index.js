#!/usr/bin/env node
var process = require('child_process');
var colors = require('colors');
var path = require('path');
const prompt = require('prompt-sync')({sigint: true});

const COMPONENT_LIST = ['navbar', 'newsfeed']

const select_component = () => {
    var user_select_comps = {}
    console.log("select components you want to add ".green)
    let str_navbar = prompt('navbar (yes) ');
    console.log('input numbers : ', str_navbar)
    if(!str_navbar || str_navbar === 'y' || str_navbar === 'yes') {
        user_select_comps.navbar = true
    }else{
        user_select_comps.navbar = false
    }
    console.log({user_select_comps})
    console.log('Finished'.green);
}

var templateDir = path.join(__dirname, 'cra-template-koix');
var cmd = process.spawn("npx", ["create-react-app","myapp8","--template",`file:${templateDir}`]);

cmd.stdout.on('data', function(output){
    dd=output.toString()
    // const dataJson = eval(`(${dd})`);
    console.log(dd)
});

cmd.on('close', function(){
    // console.log('Finished'.green);
    select_component()
});

//Error handling
cmd.stderr.on('data', function(err){
    // console.log("error".red)
    console.log(err.toString().yellow)
    // console.log(err);
});