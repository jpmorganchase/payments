#!/bin/bash

current_date_time="`date +%Y%m%d%H%M%S`";
echo $current_date_time;

git checkout -b "update_sub_modules-${current_date_time}" main
git submodule foreach git pull
git commit -am "Update all submodules"
git push --set-upstream origin "update_sub_modules-${current_date_time}"
git push