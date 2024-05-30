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
    # checking for add-movie.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/add-movie" ]
    then
        cp /home/coder/project/workspace/karma/add-movie.component.spec.ts /home/coder/project/workspace/angularapp/src/app/add-movie/add-movie.component.spec.ts;
    else
        echo "should_create_AddMovieComponent FAILED";
        echo "should_add_a_new_movie_when_form_is_valid FAILED";
        echo "should_validate_all_required_fields FAILED";
        echo "should_validate_rating_value FAILED";
    fi
 
    # checking for app.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app" ]
    then
        cp /home/coder/project/workspace/karma/app.component.spec.ts /home/coder/project/workspace/angularapp/src/app/app.component.spec.ts;
    else
        echo "should_have_as_title_movie_management_app FAILED";
    fi
 
    # checking for movie-list.component.spec.ts component
    if [ -d "/home/coder/project/workspace/angularapp/src/app/movie-list" ]
    then
        cp /home/coder/project/workspace/karma/movie-list.component.spec.ts /home/coder/project/workspace/angularapp/src/app/movie-list/movie-list.component.spec.ts;
    else
        echo "should_create_MovieListComponent FAILED";
        echo "should_call_getMovies FAILED";
        echo "should_call_deleteMovie FAILED";
    fi
 
    # checking for movie.service.spec.ts component
    if [ -e "/home/coder/project/workspace/angularapp/src/app/services/movie.service.ts" ]
    then
        cp /home/coder/project/workspace/karma/movie.service.spec.ts /home/coder/project/workspace/angularapp/src/app/services/movie.service.spec.ts;
    else
        echo "should_create_movie_service FAILED";
        echo "should_retrieve_movies_from_the_API_via_GET FAILED";
        echo "should_add_a_movie_via_POST FAILED";
        echo "should_delete_a_movie_via_DELETE FAILED";
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
    echo "should_create_AddMovieComponent FAILED";
    echo "should_add_a_new_movie_when_form_is_valid FAILED";
    echo "should_validate_all_required_fields FAILED";
    echo "should_validate_rating_value FAILED";
    echo "should_have_as_title_movie_management_app FAILED";
    echo "should_create_MovieListComponent FAILED";
    echo "should_call_getMovies FAILED";
    echo "should_call_deleteMovie FAILED";
    echo "should_create_movie_service FAILED";
    echo "should_retrieve_movies_from_the_API_via_GET FAILED";
    echo "should_add_a_movie_via_POST FAILED";
    echo "should_delete_a_movie_via_DELETE FAILED";
fi