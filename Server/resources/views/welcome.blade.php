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
                            <td class="table-content">$index</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The optional index specifies from which index to start fetching. If no index is provided, all rooms will be fetched. If no size if provided, it will display all rooms starting at the given index until the last index.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$size</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The optional size specifices how many rooms to fetch starting at the given index. If none is provided, it will fetch "size" number of rooms starting at 0.</td>
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
                            <td class="table-content">If the user trying to fetch the room does not have the required permissions.</td>

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
                            <td class="table-content">$level</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the level the room is at.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$number</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the number of the room on the current level.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$type</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Foreign Key that refers to the room type of the current room.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$rating</td>
                            <td class="table-content">int</td>
                            <td class="table-content">There to be read by the users and cannot be manually written by any user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">The name that is given to the room.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$description</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, extra details about the room are mentioned here.</td>
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
                            <td class="table-content">If the user trying to fetch the room does not have the required permissions.</td>

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
                            <td class="table-content">$level</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the level the room is at.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$number</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the number of the room on the current level.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$type</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, foreign Key that refers to the room type of the current room.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$rating</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, there to be read by the users and cannot be manually written by any user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, the name that is given to the room.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$description</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, extra details about the room are mentioned here.</td>
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
                            <td class="table-content">If the user trying to modify the room does not have the required permissions.</td>

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
                            <td class="table-content">$id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The id specifices which room to delete.</td>
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
                            <td class="table-content">If the user trying to delete the room does not have the required permissions.</td>

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
                            <td class="table-content">$check_in</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the start date input by the user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$check_out</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the end date input by the user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$adults_capacity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the capacity of adults that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$kids_capacity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the capacity of kids that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$adults_with_kids_capacity</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the capacity of adults and kids that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$index</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, if input, the filtering starts at this index until the last index if no size was provided.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$size</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, if input, the filtering size is "size" and starts at 0 if no index is provided..</td>
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
                            <td class="table-content">$id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The id specifices which room's bookings need to be fetched.</td>
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
                            <td class="table-content">$room_id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the room that the user wants to review.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$user_id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the user that is conducting the review.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Refers to the date of the conducted review.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$title</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the header of the review conducted by the user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$content</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the body of the review conducted by the user</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$stars</td>
                            <td class="table-content">stars</td>
                            <td class="table-content">Refers to the result of the review conducted by the user</td>
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
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the room types.</td>
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
                            <td class="table-content">A JSON object containing the room type along with its attributes.</td>
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
                            <td class="table-content">If the user trying to fetch the room type does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/room_types</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$adults_capacity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the capacity of adults that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$kids_capacity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the capacity of kids that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$adults_with_kids_capacity</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the capacity of adults and kids that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">The name that is given to the room type.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$price</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the price per night of the room type.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a room type and creates an instance of a room type in the database using these attributes, along with a resource. </td>
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
                            <td class="table-content">A JSON object potraying the room type resource. This will result in a 201 status code if successful.</td>
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
            <h3>http://example.com/api/v1/room_types/{id}</h3>

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
                            <td class="table-content">The id specifices which room type to fetch.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes and id as a parameter and will look for and display the room type with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen room type's attributes. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the room type does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to fetch the room type does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/rooms_types/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$adults_capacity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the capacity of adults that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$kids_capacity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the capacity of kids that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$adults_with_kids_capacity</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the capacity of adults and kids that can be handled.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the name that is given to the room type.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$price</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the price per night of the room type.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the room type with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen room type along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the room type does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the room type does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/room_types/{id}</h3>

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
                            <td class="table-content">The id specifices which room type to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a room type from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the room type does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the room type does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">Stock Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/stocks</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">


                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the stock.</td>
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
                            <td class="table-content">A JSON object containing the stock along with its attributes. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the user trying to fetch the stock does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/stocks</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the identifier of the stock.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$description</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, extra details about the stock are mentioned here.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$available_quantity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the remaining quantity of this stock that is available.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$is_ingredient</td>
                            <td class="table-content">boolean</td>
                            <td class="table-content">Specifies whether the stock is an ingredient or something not edible.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a stock item and creates an instance of a stock item in the database using these attributes, along with a resource. </td>
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
                            <td class="table-content">A JSON object potraying the stock item resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the stock does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.3 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/stocks/{id}</h3>

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
                        <td class="table-content">The id specifices which stock to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the stock with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen stock's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the stock does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the stock does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/stocks/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the identifier of the stock.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$description</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the extra details about the stock.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$available_quantity</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional,refers to the remaining quantity of this stock that is available.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$is_ingredient</td>
                            <td class="table-content">boolean</td>
                            <td class="table-content">Optional, specifies whether the stock is an ingredient or something not edible.</td>
                        </tr>
                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the stock with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen stock along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the stock does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the stock does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/stocks/{id}</h3>

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
                            <td class="table-content">The id specifices which stock to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a stock from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the stock does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the stock does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">User Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/users</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">


                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the users.</td>
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
                            <td class="table-content">A JSON object containing the users along with its attributes and relationships. The relationships section contains the user_type which is related to user as it determines the permissions of the user. This will result in a 200 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the user trying to fetch the users does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/users</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$email</td>
                            <td class="table-content">email</td>
                            <td class="table-content">Refers to the user's email.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$password</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the user's password.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$first_name</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the user's first name.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$last_name</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the user's last name</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$phone</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the user's phone number.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$gender</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the user's gender.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$date_of_birth</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Refers to when the user was born.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$tier</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Specifies the rank of the user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$type</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the user's type, for instance, if the user is a staff, which type of staff.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$language</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Specifies the preferred language of the user.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a user creates an instance of a user in the database using these attributes, along with a resource. </td>
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
                            <td class="table-content">A JSON object potraying the user resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the user does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.3 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/users/{id}</h3>

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
                        <td class="table-content">The id specifices which user to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the user with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen user's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the user does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the user does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/users/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$email</td>
                            <td class="table-content">email</td>
                            <td class="table-content">Optional, refers to the user's email.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$password</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the user's password.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$first_name</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the user's first name.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$last_name</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the user's last name</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$phone</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the user's phone number.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$gender</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the user's gender.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$date_of_birth</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Optional, refers to when the user was born.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$tier</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, specifies the rank of the user.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$type</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the user's type, for instance, if the user is a staff, which type of staff.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$language</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, specifies the preferred language of the user.</td>
                        </tr>
                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the user with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen user along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the user does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the user does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/users/{id}</h3>

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
                            <td class="table-content">The id specifices which user to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a user from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the user does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the user does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.6 fetchProfile</h2>
            <h3>Delete</h3>
            <h3>http://example.com/api/v1/users/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Parameters Provided</td>
                        </tr>

                        

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The goal of this function is to fetch and return all the data related to the profile of a logged-in user. The function retrieves various types of data, including orders and food, bookings and rooms, room types, registrations and activities, and applied promo codes. The function validates the user's authentication, and then retrieves the data related to the user from the database. After collecting the data, the function uses various resources to format the data in a standard way, and then merges the data into a single response to be returned to the user.</td>
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
                            <td class="table-content">If the user does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">User Type Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/user_types</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">


                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the user types.</td>
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
                            <td class="table-content">A JSON object containing the user types along with its attributes and relationships. This will result in a 200 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the user trying to fetch the user types does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/user_types</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the user type's identifier, for instance, if the user is a staff, which type of staff.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$description</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, extra details about the user type is mentioned here.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a user type creates an instance of a user type in the database using these attributes, along with a resource. </td>
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
                            <td class="table-content">A JSON object potraying the user type resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the user type does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.3 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/user_types/{id}</h3>

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
                        <td class="table-content">The id specifices which user type to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the user type with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen user type's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the user type does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the user type does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/user-types/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the user type's identifier, for instance, if the user is a staff, which type of staff.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$description</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, extra details about the user type is mentioned here.</td>
                        </tr>
                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the user type with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen user type along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the user type does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the user type does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/user_types/{id}</h3>

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
                            <td class="table-content">The id specifices which user type to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a user type from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the user type does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the user type does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">Registration Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/registrations</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">


                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the registration.</td>
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
                            <td class="table-content">A JSON object containing the registrations along with its attributes and relationships. The relationships section contains the user_id which is related to the user that made the Registration. It also contains the activity_id which refers to the activity that the user registered in. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the user trying to fetch the registrations does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/registrations</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$user_id</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Foreign Key, refers to the registered user's id.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$activity_id</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Foreign Key, refers to the activity that the user's registered in.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$start_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Refers to the registrations's start.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$end_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Refers to the registrations's end.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$seats</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the number of places the user wants to register.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the identifiers of a user and activity and creates an instance of Activity with the combination of their attributes in the database, along with a resource. </td>
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
                            <td class="table-content">A JSON object potraying the Registration resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the registration does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.3 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/registrations/{id}</h3>

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
                        <td class="table-content">The id specifices which registration to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the registration with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen registration's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the user type does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the registration does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/registrations/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$user_id</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, Foreign Key, refers to the registered user's id.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$activity_id</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, Foreign Key, refers to the activity that the user's registered in.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$start_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Optional, refers to the registrations's start.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$end_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Optional, refers to the registrations's end.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$seats</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the number of places the user wants to register.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the registration with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen registration along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the registration does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the registration does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/registrations/{id}</h3>

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
                            <td class="table-content">The id specifices which registration to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a registration from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the registration does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the registration does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">Promo Code Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/promocodes</h3>

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
                            <td class="table-content">$index</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The optional index specifies from which index to start fetching. If no index is provided, all promo codes will be fetched. If no size if provided, it will display all promo codes starting at the given index until the last index.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$size</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The optional size specifices how many promo codes to fetch starting at the given index. If none is provided, it will fetch "size" number of promo codes starting at 0.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the promo codes if not provided any parameters. If the index is provided, it returns all promo codes starting at this index. If provided an index and size, it will return all promo codes starting at this index, along with "size" promo codes starting at this index.</td>
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
                            <td class="table-content">A JSON object containing the promo codes along with its attributes. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the user trying to fetch the promo codes does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.2 full_index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/promocodes</h3>

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
                            <td class="table-content">$index</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The optional index specifies from which index to start fetching. If no index is provided, all promo codes will be fetched. If no size if provided, it will display all promo codes starting at the given index until the last index.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$size</td>
                            <td class="table-content">int</td>
                            <td class="table-content">The optional size specifices how many promo codes to fetch starting at the given index. If none is provided, it will fetch "size" number of promo codes starting at 0.</td>
                        </tr>


                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the promo codes if not provided any parameters. If the index is provided, it returns all promo codes starting at this index. If provided an index and size, it will return all promo codes starting at this index, along with "size" promo codes starting at this index.</td>
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
                            <td class="table-content">A JSON object containing the promo codes along with its attributes. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the user trying to fetch the promo codes does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.3 store</h2>
            <h3>Post</h3>
            <h3>http://example.com/api/v1/promocodes</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$change</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Defines how much the promo code will affect the price.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$code</td>
                            <td class="table-content">string</td>
                            <td class="table-content">The promo code identifier.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$start_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Refers to the promo code's start.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$end_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Refers to the promo code's end.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a promo code and creates an instance of Promo Code in the database, along with a resource. Also creates an instance of EligibilityPromoCode and EffectPromoCode in their respective tables. </td>
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
                            <td class="table-content">A JSON object potraying the Promo Code resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the promo code does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.4 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/promocodes/{id}</h3>

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
                        <td class="table-content">The id specifices which promo code to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the promo code with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen promo code's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the promo code does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the promo code does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.5 update</h2>
            <h3>Put</h3>
            <h3>http://example.com/api/v1/promocodes/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$change</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, defines how much the promo code will affect the price.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$code</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, acts as the promo code identifier.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$start_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Optional, refers to the promo code's start.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$end_date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Optional, refers to the promo code's end.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the promo code with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen promo code along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the promo code does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the promo code does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.6 destroy</h2>
            <h3>Delete</h3>
            <h3>http://example.com/api/v1/promocodes/{id}</h3>

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
                            <td class="table-content">The id specifices which promo code to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a promo code from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the promo code does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the promo code does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.7 applyPromo</h2>
            <h3>Post</h3>
            <h3>http://example.com/api/v1/promocodes/{id}</h3>

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
                            <td class="table-content">The id specifices which promo code to apply.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to apply a promo code from the database to a specific user's account.</td>
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
                            <td class="table-content"> Will result in a 201 status code if the promo code was not already applied to the user's account and the is eligible. Will result in a 200 status code if the promo code was not already applied to the user's account but the user is not eligible. Will result in a 200 status if the user had already applied the promo code. </td>
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
                            <td class="table-content">If the promo code does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Invalid Type</td>
                            <td class="table-content">If the user, user type or tier does not exist.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the promo code does not have the required permissions.</td>

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
            <h2 style="font-size: 4vw;">1.8 isAlreadyApplied</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/promocodes/{id}</h3>

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
                            <td class="table-content">string</td>
                            <td class="table-content">The id specifices which promo code to check if already applied.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to check if a promo code is already applied to a user, user type or tier.</td>
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
                            <td class="table-content"> Returns a JSON object containing the promo codes that are already applied on the designated user's account, along with a status of 200 if successful. Will result in a 200 status code if no applied promo codes records were found.</td>
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
                            <td class="table-content">If the promo code does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to fetch the applied promo code does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">Permission Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/permissions</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">


                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the permissions.</td>
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
                            <td class="table-content">A JSON object containing the permissions along with its attributes. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the user trying to fetch the permissions does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/permissions</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$concerned_party</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Defines the user that will get the permissions.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$is_singular</td>
                            <td class="table-content">boolean</td>
                            <td class="table-content">Specifies if it's one person or a group of people getting the permissions.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Refers to the permission's label.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$decided_permissions</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Binary number in octal format referring to the permissions given, in the format of Read, Write, Delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of a permission and creates an instance of Permission in the database, along with a resource.</td>
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
                            <td class="table-content">A JSON object potraying the Permission resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the permission does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.3 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/permissions/{id}</h3>

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
                        <td class="table-content">The id specifices which permission to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the permission with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen permission's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the permission does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the permission does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/permissions/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$concerned_party</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, defines the user that will get the permissions.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$is_singular</td>
                            <td class="table-content">boolean</td>
                            <td class="table-content">Optional, specifies if it's one person or a group of people getting the permissions.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$label</td>
                            <td class="table-content">string</td>
                            <td class="table-content">Optional, refers to the permission's label.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$decided_permissions</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, this binary number is in octal format and refers to the permissions given, in the format of Read, Write, Delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the permission with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen permission along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the permission does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the permission does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/permissions/{id}</h3>

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
                            <td class="table-content">The id specifices which permission to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a permission from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content">If the permission does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the permission does not have the required permissions.</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Internal Server Error</td>
                            <td class="table-content">If the connection is lost or if the server crashes.</td>
                        </tr>

                    </table>
                </div>

            </div>
        </div>
        <h1 style="text-align: center;">Order Controller</h1>
        <div>
            <h2 style="font-size: 4vw;">1.1 index</h2>
            <h3>Get</h3>
            <h3>http://example.com/api/v1/orders</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">


                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">No Required Parameters</td>
                            
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The function returns all the orders.</td>
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
                            <td class="table-content">A JSON object containing the orders along with its attributes along with its relationships. The relationships contain the user that made the order. This will result in a 200 status code if successful.</td>
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
                            <td class="table-content">If the user trying to fetch the orders does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/orders</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Defines when the order was ordered.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$user_id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Specifies which user made the order.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$status</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Refers to the order's status.</td>
                        </tr>
                       
                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes as input the attributes of an order and creates an instance of Order in the database, along with a resource. In this case, the ingredients are removed from to the stock table</td>
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
                            <td class="table-content">A JSON object potraying the Order resource. This will result in a 201 status code if successful.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Errors:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-col">Error</td>
                            <td class="table-desc">Description</td>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to add the order does not have the required permissions.</td>

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
        <h2 style="font-size: 4vw;">1.3 show</h2>
        <h3>Get</h3>
        <h3>http://example.com/api/v1/orders/{id}</h3>

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
                        <td class="table-content">The id specifices which order to fetch.</td>
                    </tr>


                </table>
                <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">This functions takes and id as a parameter and will look for and display the order with this id in the database.</td>
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
                        <td class="table-content">A JSON object containing the chosen order's attributes. This will result in a 200 status code if successful.</td>
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
                        <td class="table-content">If the order does not exist</td>

                    </tr>
                    <tr style="height:8px;text-align:center;">
                        <td class="table-content">Unauthenticated</td>
                        <td class="table-content">If the user trying to fetch the order does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/orders/{id}</h3>

            <div class="card mb-3">
                <div class="card-header">
                    <h4 style="background-color: #80808041;padding:16px">Parameters</h4>
                </div>
                <div class="card-body">
                    <table style="table-layout: auto;width:100%">

                    <tr style="height:8px;text-align:center;">
                            <td class="table-content">$date</td>
                            <td class="table-content">date</td>
                            <td class="table-content">Optional, defines when the order was ordered.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$user_id</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, specifies which user made the order.</td>
                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">$status</td>
                            <td class="table-content">int</td>
                            <td class="table-content">Optional, refers to the order's status.</td>
                        </tr>
                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">This functions takes an id as a parameter and will look for the order with this id in the database.</td>
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
                            <td class="table-content">A JSON object containing the chosen order along with its modified attributes. This will result in a 201 status code if successful. Will result in a 200 status code with no JSON object if the user did not pass any data to modify.</td>
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
                            <td class="table-content">If the order does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to modify the order does not have the required permissions.</td>

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
            <h3>http://example.com/api/v1/orders/{id}</h3>

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
                            <td class="table-content">The id specifices which order to delete.</td>
                        </tr>

                    </table>
                    <h4 style="background-color: #80808041;padding:16px">Description:</h4>
                    <table style="table-layout: auto;width:100%">

                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">The purpose of the function is to delete a order from the database using the specified model and ID. If the $safety_check parameter is provided, the function will perform a safety check to ensure that the record can be safely deleted. The safety check involves finding related records in the $safety_check model using the foreign key and primary key columns. If related records are found, the function will return a response containing a collection of related records using the specified $safety_resource resource. If no related records are found, the function will proceed with deleting the record using the specified model and ID. If the delete operation is successful, the function will return a response indicating success. If the delete operation fails, the function will return a response indicating that the specified ID was not found in the database.</td>
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
                            <td class="table-content"> Will result in a 200 status code if no related records were found. In this case, the ingredients are added back to the stock table. Returns a 200 status code along with the related records otherwise. </td>
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
                            <td class="table-content">If the order does not exist</td>

                        </tr>
                        <tr style="height:8px;text-align:center;">
                            <td class="table-content">Unauthenticated</td>
                            <td class="table-content">If the user trying to delete the order does not have the required permissions.</td>

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