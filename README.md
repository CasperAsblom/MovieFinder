# MovieFinder

## Introduction
In this project, I use semantic web technology (building and integrating ontologies and datasets, query data using SPARQL) to build a basic web application that provides users with an easy and efficient way of finding a suitable movie to watch. 

## Screenshots

![Screenshot1](https://user-images.githubusercontent.com/30833034/132019867-19fd6fd2-b582-477c-9c99-06ee7656a91e.png)
![Screenshot2](https://user-images.githubusercontent.com/30833034/132019881-20ebb985-fbb8-4016-b8bb-02e79c97ada5.png)

## Demo
![MovieFinderDemo](https://user-images.githubusercontent.com/30833034/125934227-c12a686f-9a03-4b57-9a60-492edda44418.gif)

Full demo: https://1drv.ms/v/s!Ar4x8thpSJn0hN9T8AVi8Z2-aBi46w?e=Y6zLgx
(This demo also showcases the querying and inferencing in GraphDB)

## How to use this app

To run the application, create a GraphDB repository named Project (I used the OWL-Max (optimized) ruleset), and import the "FinalOntology.ttl" file. The import will probably take around five minutes as the file is quite large. Once you're connected to the repository, you will be able to run the application by simply opening the "index.html" file found in the folder "ApplicationCode". The input you select in the application will then automatically be parameterized into a query to the local knowledge graph.

To avoid the "CORS header 'Access-Control-Allow-Origin' missing" error, set the "graphdb.workbench.cors.enable" to True in the GraphDB settings:\
![DoThisInGraphDB](https://user-images.githubusercontent.com/30833034/125935861-1402609d-f2b2-4764-9419-547fe68b5d24.png)

## What does this app do

This app lets the user choose a decade, genre, runtime, and releasing country in dropdown menus. This information is then added to a SPARQL query, which subsequently returns all movies that match the information provided by the user.
