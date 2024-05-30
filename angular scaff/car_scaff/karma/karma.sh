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
    # checking for add-car.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/add-car" ]
    then
        cp /home/coder/project/workspace/karma/add-car.component.spec.ts /home/coder/project/workspace/angularapp/src/app/add-car/add-car.component.spec.ts;
    else
        echo "should_create_AddCarComponent FAILED";
        echo "should_add_a_new_car_when_form_is_valid FAILED";
        echo "should_require_all_form_fields_to_be_filled_in FAILED";
        echo "should_validate_car_model_length FAILED";
    fi

    # checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/app/app.component.spec.ts;
    else
        echo "should_have_as_title_car_management_app FAILED";
    fi

    # checking for car-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/car-list" ]
    then
        cp /home/coder/project/workspace/karma/car-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/car-list/car-list.component.spec.ts;
    else
        echo "should_create_CarListComponent FAILED";
        echo "should_call_getCars FAILED";
        echo "should_call_deleteCar FAILED";
    fi

    # checking for car.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/car.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/car.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/car.service.spec.ts;
    else
        echo "should_create_CarService FAILED";
        echo "should_retrieve_cars_from_the_API_via_GET FAILED";
        echo "should_add_a_car_via_POST FAILED";
        echo "should_delete_a_car_via_DELETE FAILED";
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
    echo "should_create_AddCarComponent FAILED";
    echo "should_add_a_new_car_when_form_is_valid FAILED";
    echo "should_require_all_form_fields_to_be_filled_in FAILED";
    echo "should_validate_car_model_length FAILED";
    echo "should_have_as_title_car_management_app FAILED";
    echo "should_create_CarListComponent FAILED";
    echo "should_call_getCars FAILED";
    echo "should_call_deleteCar FAILED";
    echo "should_create_CarService FAILED";
    echo "should_retrieve_cars_from_the_API_via_GET FAILED";
    echo "should_add_a_car_via_POST FAILED";
    echo "should_delete_a_car_via_DELETE FAILED";
fi