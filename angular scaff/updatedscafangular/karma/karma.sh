#!/bin/bash
export NVM_DIR="/usr/local/nvm"  
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 14
export CHROME_BIN=/usr/bin/chromium
if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
 
    # checking for age-checkercomponent
 if [ -d "/home/coder/project/workspace/angularapp/src/app/age-checker" ]
    then
        cp /home/coder/project/workspace/karma/age-checker.component.spec.ts /home/coder/project/workspace/angularapp/src/app/age-checker/age-checker.component.spec.ts;
    else
        echo "should_create_the_age_checker_component FAILED";
        echo "should_have_initial_values_for_age_and_ageGroup FAILED";
        echo "should_set_age_group_correctly_for_different_ages FAILED";
    fi

        # checking for navbarcomponent
 if [ -d "/home/coder/project/workspace/angularapp/src/app/navbar" ]
    then
        cp /home/coder/project/workspace/karma/navbar.component.spec.ts /home/coder/project/workspace/angularapp/src/app/navbar/navbar.component.spec.ts;
    else
        echo "should_create_navbar_component FAILED";
        echo "should_display_FitHub_in_the_navbar_title FAILED";
    fi

    # checking for homecomponent
 if [ -d "/home/coder/project/workspace/angularapp/src/app/home" ]
    then
        cp /home/coder/project/workspace/karma/home.component.spec.ts /home/coder/project/workspace/angularapp/src/app/home/home.component.spec.ts;
    else
        echo "should_create_home_component FAILED";
    fi


    # checking for bmicomponent
 if [ -d "/home/coder/project/workspace/angularapp/src/app/bmi" ]
    then
        cp /home/coder/project/workspace/karma/bmi.component.spec.ts /home/coder/project/workspace/angularapp/src/app/bmi/bmi.component.spec.ts;
    else
        echo "should_create_the_bmi_component FAILED";
        echo "should_calculate_BMI_correctly FAILED";
    fi


    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ];
    then
        cd /home/coder/project/workspace/angularapp/
        npm test;
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi
else  
        echo "should_create_the_age_checker_component FAILED";
        echo "should_have_initial_values_for_age_and_ageGroup FAILED";
        echo "should_set_age_group_correctly_for_different_ages FAILED";
        echo "should_create_navbar_component FAILED";
        echo "should_display_FitHub_in_the_navbar_title FAILED";
        echo "should_create_home_component FAILED";
        echo "should_create_the_bmi_component FAILED";
        echo "should_calculate_BMI_correctly FAILED";
fi