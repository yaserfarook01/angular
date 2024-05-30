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
    # checking for add-stock.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/add-stock" ]
    then
        cp /home/coder/project/workspace/karma/add-stock.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/add-stock/add-stock.component.spec.ts;
    else
        echo "should_create_AddStockComponent FAILED";
        echo "should_add_a_new_stock_when_form_is_valid FAILED";
        echo "should_require_all_form_fields_to_be_filled_in FAILED";
        echo "should_validate_stock_symbol_length FAILED";
    fi

    # checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/app/app.component.spec.ts;
    else
        echo "should_have_as_title_stock_management_app FAILED";
    fi

    # checking for stock-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/components/stock-list" ]
    then
        cp /home/coder/project/workspace/karma/stock-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/components/stock-list/stock-list.component.spec.ts;
    else
        echo "should_create_StockListComponent FAILED";
        echo "should_call_getStocks FAILED";
        echo "should_call_deleteStock FAILED";
    fi

    # checking for stock.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/stock.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/stock.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/stock.service.spec.ts;
    else
        echo "service_should_be_created FAILED";
        echo "should_retrieve_stocks_from_the_API_via_GET FAILED";
        echo "should_add_a_stock_via_POST FAILED";
        echo "should_delete_a_stock_via_DELETE FAILED";
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
    echo "should_create_AddStockComponent FAILED";
    echo "should_add_a_new_stock_when_form_is_valid FAILED";
    echo "should_require_all_form_fields_to_be_filled_in FAILED";
    echo "should_validate_stock_symbol_length FAILED";
    echo "should_have_as_title_stock_management_app FAILED";
    echo "should_create_StockListComponent FAILED";
    echo "should_call_getStocks FAILED";
    echo "should_call_deleteStock FAILED";
    echo "service_should_be_created FAILED";
    echo "should_retrieve_stocks_from_the_API_via_GET FAILED";
    echo "should_add_a_stock_via_POST FAILED";
    echo "should_delete_a_stock_via_DELETE FAILED";
fi