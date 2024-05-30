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
    # checking for add-laptop.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/add-laptop" ]
    then
        cp /home/coder/project/workspace/karma/add-laptop.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/add-laptop/add-laptop.component.spec.ts;
    else
        echo "should_create_AddLaptopComponent FAILED";
        echo "should_add_a_new_laptop_when_form_is_valid FAILED";
        echo "should_require_all_form_fields_to_be_filled_in FAILED";
        echo "should_validate_laptop_brand_length FAILED";
    fi

    # checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/app/app.component.spec.ts;
    else
        echo "should_have_as_title_laptop_management_app FAILED";
    fi

    # checking for laptop-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/laptop-list" ]
    then
        cp /home/coder/project/workspace/karma/laptop-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/laptop-list/laptop-list.component.spec.ts;
    else
        echo "should_create_LaptopListComponent FAILED";
        echo "should_call_getLaptops FAILED";
        echo "should_call_deleteLaptop FAILED";
    fi

    # checking for laptop.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/laptop.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/laptop.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/laptop.service.spec.ts;
    else
        echo "service_should_be_created FAILED";
        echo "should_retrieve_laptops_from_the_API_via_GET FAILED";
        echo "should_add_a_laptop_via_POST FAILED";
        echo "should_delete_a_laptop_via_DELETE FAILED";
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
    echo "should_create_AddLaptopComponent FAILED";
    echo "should_add_a_new_laptop_when_form_is_valid FAILED";
    echo "should_require_all_form_fields_to_be_filled_in FAILED";
    echo "should_validate_laptop_brand_length FAILED";
    echo "should_have_as_title_laptop_management_app FAILED";
    echo "should_create_LaptopListComponent FAILED";
    echo "should_call_getLaptops FAILED";
    echo "should_call_deleteLaptop FAILED";
    echo "service_should_be_created FAILED";
    echo "should_retrieve_laptops_from_the_API_via_GET FAILED";
    echo "should_add_a_laptop_via_POST FAILED";
    echo "should_delete_a_laptop_via_DELETE FAILED";
fi