#!/bin/bash
export CHROME_BIN=/usr/bin/chromium
if [ ! -d "/home/coder/project/workspace/angularapp" ]
then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]
then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
    # checking for add-house.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/add-house" ]
    then
        cp /home/coder/project/workspace/karma/add-house.component.spec.ts /home/coder/project/workspace/angularapp/src/app/add-house/add-house.component.spec.ts;
    else
        echo "should_create_AddHouseComponent FAILED";
        echo "should_add_a_new_house_when_form_is_valid FAILED";
        echo "should_require_all_form_fields_to_be_filled_in FAILED";
        echo "should_validate_house_address_length FAILED";
    fi

    # checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/app.component.spec.ts;
    else
        echo "should_have_as_title_house_management_app FAILED";
    fi

    # checking for house-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/house-list" ]
    then
        cp /home/coder/project/workspace/karma/house-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/house-list/house-list.component.spec.ts;
    else
        echo "should_create_HouseListComponent FAILED";
        echo "should_call_getHouses FAILED";
        echo "should_call_deleteHouse FAILED";
    fi

    # checking for house.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/house.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/house.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/house.service.spec.ts;
    else
        echo "should_create_HouseService FAILED";
        echo "should_retrieve_houses_from_the_API_via_GET FAILED";
        echo "should_add_a_house_via_POST FAILED";
        echo "should_delete_a_house_via_DELETE FAILED";
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
    echo "should_create_AddHouseComponent FAILED";
    echo "should_add_a_new_house_when_form_is_valid FAILED";
    echo "should_require_all_form_fields_to_be_filled_in FAILED";
    echo "should_validate_house_address_length FAILED";
    echo "should_have_as_title_house_management_app FAILED";
    echo "should_create_HouseListComponent FAILED";
    echo "should_call_getHouses FAILED";
    echo "should_call_deleteHouse FAILED";
    echo "should_create_HouseService FAILED";
    echo "should_retrieve_houses_from_the_API_via_GET FAILED";
    echo "should_add_a_house_via_POST FAILED";
    echo "should_delete_a_house_via_DELETE FAILED";
fi