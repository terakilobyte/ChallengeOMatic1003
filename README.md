# Challenge-O-Matic 1000
Challenge-O-Matic is a Waypoint and Bonfire authoring tool for the Free Code Camp cirriculum.  It reads and edits the seeds/challenges/\*.json files.

This is a work in progress, it may crash/burn/fold/spindle/mutilate.  Do not taunt the Challenge-O-Matic.

## Install Instructions
Assumes basic node.js and MEAN stack install.

1. Clone to local directory
2. `npm install && bower install`
3. In another term:  
`babel ./public/uncompiledJavascripts/ --watch --out-dir ./public/js/`
4. Back in the original term
  * `cd bin`
  * `node www`
  * Connect to http://localhost:5252

## Usage
* Click "Choose File" and select a local \*.json File
* Individual challenges can be edited.  
* Clicking 'Save' saves to memory only. If the node instance crashes or goes down, all changes will be lost.
* Clicking Export All exports the currently saved changes to a file to download and save.

## Future Features
* Create New challenges
* Copy Existing Challenge
* Drag 'n Drop reordering
* Chai Testing (FCC interface simulator)
* Full FCC site integration

## Potential Issues
* Potential crash on exporting files
    Solution: Use run option two instead of run option one
