List of transit operators (id: SFTMTA, BART, etc.)
Example GET
http://api.511.org/transit/operators?api_key={your-key}
Example Response Item
[  {
    "Id": null,
    "Name": "511 Emergency",
    "ShortName": "511 Emergency",
    "SiriOperatorRef": null,
    "TimeZone": "America/Vancouver",
    "DefaultLanguage": "en",
    "ContactTelephoneNumber": null,
    "WebSite": null,
    "PrimaryMode": "other",
    "PrivateCode": "5E",
    "Montiored": false,
    "OtherModes": ""
  } ]

List of Buses
Example GET
http://api.511.org/transit/lines?api_key={your-key}&operator_id=SFMTA
Example Response Item
[  {
    "Id": "3",
    "Name": "JACKSON",
    "TransportMode": "bus",
    "PublicCode": "3",
    "SiriLineRef": "3",
    "Montiored": true,
    "OperatorRef": "SFMTA"
  } ]

List of Stops
Example GET
e.g. http://api.511.org/transit/stops?api_key={yourkey}&operator_id=SFMTA
Example Response
{
  "Contents": {
    "ResponseTimestamp": "2016-09-02T02:14:35-07:00",
    "dataObjects": {
      "id": "SF",
      "ScheduledStopPoint": [
        {
          "id": "15829",
          "Name": "100 O'Shaughnessy Blvd",
          "Location": {
            "Longitude": "-122.450678",
            "Latitude": "37.744481"
          },
          "StopType": "onstreetBus"
        }
      ],
      "stopAreas": null
    }
  }
}

List of Stop Places
Example GET 
http://api.511.org/transit/stopPlaces?api_key={yourkey}&operator_id=SFMTA
Example Response
{
  "Siri": {
    "ServiceDelivery": {
      "ResponseTimestamp": "2016-09-02T02:20:06-07:00",
      "DataObjectDelivery": {
        "ResponseTimestamp": "2016-09-02T02:20:06-07:00",
        "dataObjects": {
          "SiteFrame": {
            "@version": "any",
            "@id": "SFMTA",
            "stopPlaces": {
              "StopPlace": [
                {
                  "@version": "any",
                  "@id": "198",
                  "Name": "2ND ST &amp; MARKET ST",
                  "Description": null,
                  "Centroid": {
                    "Location": {
                      "Longitude": "-122.401225",
                      "Latitude": "37.789255"
                    }
                  },
                  "AccessibilityAssessment": {
                    "@version": "any",
                    "@id": "198",
                    "MobilityImpairedAccess": "unknown",
                    "limitations": {
                      "AccessibilityLimitation": {
                        "WheelchairAccess": "unknown"
                      }
                    }
                  },
                  "PostalAddress": {
                    "AddressLine1": "2ND ST & MARKET ST",
                    "Town": "San Francisco"
                  },
                  "OperatorRef": {
                    "@ref": "SFMTA"
                  },
                  "adjacentSites": {
                    "ParkingRef": {
                      "@ref": ""
                    }
                  },
                  "PublicCode": "198",
                  "TransportMode": "unknown",
                  "StopPlaceType": "onstreetBus"
                },
                ...
              ]
            },
            "parkings": null
          }
        }
      }
    }
  }
}

Pattern - Ordered list of stop points for a Bus
Example GET
http://api.511.org/transit/patterns?api_key={yourkey}&operator_id=SFMTA&line_id=9
Example Response
{
  "directions": [
    {
      "DirectionId": "OB",
      "Name": "Outbound"
    },
    {
      "DirectionId": "IB",
      "Name": "Inbound"
    }
  ],
  "journeyPatterns": [
    {
      "serviceJourneyPatternRef": "191413",
      "LineRef": "9",
      "Name": "",
      "DirectionRef": "OB",
      "DestinationDisplayView": {
        "FontText": "Bayshore Boulevard"
      },
      "PointsInSequence": {
        "StopPointInJourneyPattern": [
          {
            "StopPointInJourneyPatternId": "7955537",
            "Order": "2",
            "ScheduledStopPointRef": "15669"
          },
          {
            "StopPointInJourneyPatternId": "7955538",
            "Order": "3",
            "ScheduledStopPointRef": "15657"
          },
          ...
      },
      "LinksInSequence": {
        "ServiceLinkInJourneyPattern": ""
      }
    }
  ]
}

Get Reat-Time Departures for a Stop
Example GET
http://api.511.org/transit/StopMonitoring?api_key={your-key}&agency=SFMTA&stopCode=16039
Example Response
...

