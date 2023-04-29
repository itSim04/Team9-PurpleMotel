<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>API documentation</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <style>
        body {
            font-family: 'figtree', sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
        }

        .header {
            background-color: #930000;
            color: #fff;
            text-align: center;
            padding: 16px;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 16px;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            font-weight: 600;
            transition: background-color 0.3s ease;
        }

        .table-col {

            padding: 12px;
            border: 1px solid #e5e5e5;
            background-color: #14274Ae1;
            color: white;
        }

        .table-desc {

            padding: 12px;
            border: 1px solid #e5e5e5;
            background-color: #14274Ae1;
            color: white;
        }

        .table-content {
            padding: 12px;
            border: 1px solid #14274Ae1;
            background-color: #80808011;
        }
    </style>
</head>

<body>
    <div class="header">
        API Documentation
    </div>
    <div class="container">
        <div>

            <h1 style="text-align: center;">Rooms Controller</h1>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/rooms</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Holds an index and a size. The optional index specifies from which index to start fetching, the optional size specifices how many rooms to fetch starting at this index. This is used for pagination</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the rooms if not provided any parameters. If the index is provided, it returns all rooms starting at this index. If provided an index and size, it will return all rooms starting at this index, along with "size" rooms starting at this index. If it had any reviews or promo codes applied to it, it will also fetch these.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content">A JSON object containing the room along with its attributes and relationships. The relationships section contains the room_type which is related to room as it holds the price and capacity of the room. This will result in a 200 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to access the room does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.2 store</h2>
            <h3>Post</h3>
            <h3>http://example.com/api/v1/rooms</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Used to validate the attributes passed to it and to fetch needed attributes.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$model</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Specifies the type of model passed to the function. Will be used to create an instance of this model.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$resource</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Specifies the type of resource passed to the function. Will be used to create an instance of this resource.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$options</td>
                            <td class="table-content">array</td>
                            <td class="table-content">Holds the room attributes.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$singular</td>
                            <td class="table-content">bool</td>
                            <td class="table-content">Specifies if the function should return a single resource or a collection of resources. Returns a single resource by default.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a room and creates an instance of a room in the database using these attributes, along with a resource. </td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content">A JSON object potraying the room resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the room does not have the required permissions.</td>

                        </tr>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>

        </div>
        <div>
            <h2 style="font-size: 4vw;">1.3 show</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/rooms/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The id specifices which room to fetch.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes and id as a parameter and will look for and display the room with this id in the database.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content">A JSON object containing the chosen room's attributes and relationships. The relationships section contains the room_type which is related to room as it holds the price and capacity of the room. This will result in a 200 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">{id} not in Database</td>
                            <td class="table-content">If the room does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the room does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.4 update</h2>
            <h3>Put</h3>
            <h3>http://example.com/api/v1/rooms/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Used to validate the attributes passed to it and to fetch needed attributes.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$model</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Specifies the type of model passed to the function. Will be used to look for the existing model with the provided id.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$resource</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Specifies the type of resource passed to the function. Will be used to create an instance of this resource containing the updated data.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$options</td>
                            <td class="table-content">array</td>
                            <td class="table-content">Holds the new room attributes that will replace the old ones.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$model_table</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Null by default.Specifies the table where the model is located. This will be used to modify</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$singular</td>
                            <td class="table-content">bool</td>
                            <td class="table-content">Specifies if the function should return a single resource or a collection of resources.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for and display the room with this id in the database.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content">A JSON object containing the chosen room along with its modified attributes and relationships. The relationships section contains the room_type which is related to room as it holds the price and capacity of the room. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">{id} not in Database</td>
                            <td class="table-content">If the room does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the room does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">An error occured</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.5 destroy</h2>
            <h3>Delete</h3>
            <h3>http://example.com/api/v1/rooms/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$model</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Specifies the type of model passed to the function. Will be used to look for the existing model with the provided id.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The id specifices which room to delete.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$safety_check</td>
                            <td class="table-content">string</td>
                            <td class="table-content">The name of the model to use for a safety check.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$foreign_key</td>
                            <td class="table-content">array</td>
                            <td class="table-content">The name of the foreign key column to use for the safety check.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$primary_key</td>
                            <td class="table-content">bool</td>
                            <td class="table-content">The name of the primary key column to use for the safety check.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$safety_resource</td>
                            <td class="table-content">string</td>
                            <td class="table-content">The name of the resource to use for a safety check.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a record from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content"> Will result in a 200 status code if no related records were found. Returns a 200 status code along with the related records otherwise. </td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">{id} not in Database</td>
                            <td class="table-content">If the room does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the room does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.6 filter</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/rooms/</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Holds the filter criteria provided by the user to filter rooms by, some examples are: check_in, check_out, reviews and price.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of this function is to handle a filter request made to the server by a client. It takes in a request object that includes a list of criterias, and uses this information to filter rooms that are available for booking during that period. The function then returns a response to the client, including a collection of RoomResource objects representing the available rooms, as well as any related resources such as RoomTypeResource objects and PromoCodeResource objects that may be applicable to the client's request</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content"> Returns a JSON object containing the available rooms for booking. This will result in a 200 status code if successful. </td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.7 roomBookings</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/rooms/</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Used to hold and validate the room attributes provied by the user.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This function takes in a request holding a room and returns a collection of Booking resources that match the room_id provided in the request. It first validates the request to ensure that the room_id parameter is present and is a valid number. Then it retrieves all Booking records from the database and filters them based on the room_id parameter before returning the collection of Booking resources.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content"> Returns a JSON object containing all the bookings found for this room.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthorized</td>
                            <td class="table-content">If the user is not a guest.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <div>
            <h2 style="font-size: 4vw;">1.8 postReview</h2>
            <h3>Post</h3>
            <h3>http://example.com/api/v1/rooms/</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Used to hold and validate the room attributes provied by the user.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This function request containing information about a review, validates the request data, and then either creates a new review in the database or returns an error message indicating that the user has already posted a review for that room. If a review is found, the function returns a 400 error with a message indicating that the user has already posted a review. If no review is found, the function creates a new review in the database using the data from the request. The new review is then returned in a 200 response.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content"> Returns a JSON object containing the review that the user posted along with a 200 status if successful. If the user has already reviewed the room, a 400 status is returned along with an informative message.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthorized</td>
                            <td class="table-content">If the user is not a guest.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">Room Types Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/room_types</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Name</td>
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$request</td>
                            <td class="table-content">Request</td>
                            <td class="table-content">Holds an index and a size. The optional index specifies from which index to start fetching, the optional size specifices how many room types to fetch starting at this index. This is used for pagination</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the room types if not provided any parameters. If the index is provided, it returns all room types starting at this index. If provided an index and size, it will return all room types starting at this index, along with "size" room types starting at this index.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Returns:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Type</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">JSON</td>
                            <td class="table-content">A JSON object containing the room type along with its attributes and relationships. The relationships section contains the room that the room type refers to.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to access the room type does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>


    </div>



</body>

</html>