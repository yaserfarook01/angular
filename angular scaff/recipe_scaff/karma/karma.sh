#!/bin/bash

export CHROME_BIN=/usr/bin/chromium

if [ ! -d "/home/coder/project/workspace/angularapp" ]; then
    cp -r /home/coder/project/workspace/karma/angularapp /home/coder/project/workspace/;
fi

if [ -d "/home/coder/project/workspace/angularapp" ]; then
    echo "project folder present"
    cp /home/coder/project/workspace/karma/karma.conf.js /home/coder/project/workspace/angularapp/karma.conf.js;
    
    # Checking for add-recipe.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/add-recipe" ]; then
        cp /home/coder/project/workspace/karma/add-recipe.component.spec.ts /home/coder/project/workspace/angularapp/src/app/add-recipe/add-recipe.component.spec.ts;
    else
        echo "should_create_AddRecipeComponent FAILED";
        echo "should_add_a_new_recipe_when_form_is_valid FAILED";
        echo "should_require_all_form_fields_to_be_filled_in FAILED";
        echo "should_validate_recipe_name_length FAILED";
    fi
    
    # Checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app" ]; then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/app.component.spec.ts;
    else
        echo "should_have_as_title_recipe_management_app FAILED"
    fi

    # Checking for recipe-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/recipe-list" ]; then
        cp /home/coder/project/workspace/karma/recipe-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/recipe-list/recipe-list.component.spec.ts;
    else
        echo "should_create_RecipeListComponent FAILED";
        echo "should_call_getRecipes FAILED";
        echo "should_call_deleteRecipe FAILED";
    fi
    
    # Checking for recipe.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/recipe.service.ts" ]; then
        cp /home/coder/project/workspace/karma/recipe.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/recipe.service.spec.ts;
    else
        echo "should_create_recipe_service FAILED";
        echo "should_retrieve_recipes_from_the_API_via_GET FAILED";
        echo "should_add_a_recipe_via_POST FAILED";
        echo "should_delete_a_recipe_via_DELETE FAILED";
    fi

    # Navigate and run npm tests
    if [ -d "/home/coder/project/workspace/angularapp/node_modules" ]; then
        cd /home/coder/project/workspace/angularapp/
        npm test
    else
        cd /home/coder/project/workspace/angularapp/
        yes | npm install
        npm test
    fi

else
    echo "should_have_as_title_recipe_management_app FAILED"
    echo "should_create_AddRecipeComponent FAILED";
    echo "should_add_a_new_recipe_when_form_is_valid FAILED";
    echo "should_require_all_form_fields_to_be_filled_in FAILED";
    echo "should_validate_recipe_name_length FAILED";
    echo "should_create_RecipeListComponent FAILED";
    echo "should_call_getRecipes FAILED";
    echo "should_call_deleteRecipe FAILED";
    echo "should_create_recipe_service FAILED";
    echo "should_retrieve_recipes_from_the_API_via_GET FAILED";
    echo "should_add_a_recipe_via_POST FAILED";
    echo "should_delete_a_recipe_via_DELETE FAILED";
fi
