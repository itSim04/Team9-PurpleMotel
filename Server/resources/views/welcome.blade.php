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

        .navbar {
            background-color: #f5f5f5;
            border-bottom: 1px solid #e5e5e5;
        }

        .tabs {
            display: flex;
            justify-content: center;

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
        .table-content{
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
        <div class="tab content">

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
                            <td class="table-content">Holds an index and a size. The index specifies which Room to fetch, the optional size specifices how many rooms to fetch starting at this index. This is used for pagination</td>
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
                            <td class="table-content">A JSON object containing the room attributes and relationships. The relationships section contains the room_type which is related to room as it holds the price and capacity of the room. This will result in a 200 status code if successful.</td>
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