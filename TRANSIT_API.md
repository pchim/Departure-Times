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

Get Real-Time Departures for a Stop
Example GET (stopCode comes from stops)
http://api.511.org/transit/StopMonitoring?api_key={your-key}&agency=SFMTA&stopCode=16038
Example Response
{
  "ServiceDelivery": {
    "ResponseTimestamp": "2016-09-03T06:58Z",
    "ProducerRef": "SF-MUNI",
    "Status": true,
    "StopMonitoringDelivery": {
      "version": "1.4",
      "ResponseTimestamp": "2016-09-03T06:58Z",
      "Status": true,
      "MonitoredStopVisit": [
        {
          "RecordedAtTime": "2016-09-03T06:57:18Z",
          "MonitoringRef": "16038",
          "MonitoredVehicleJourney": {
            "LineRef": "33",
            "DirectionRef": "Inbound",
            "FramedVehicleJourneyRef": {
              "DataFrameRef": "2016-09-02",
              "DatedVehicleJourneyRef": "7253728"
            },
            "PublishedLineName": "33-Ashbury-18th",
            "OperatorRef": "sf-muni",
            "Monitored": true,
            "VehicleLocation": {
              "Longitude": -122.40682,
              "Latitude": 37.75133
            },
            "MonitoredCall": {
              "StopPointRef": "16038",
              "VisitNumber": "1",
              "StopPointName": "Potrero Ave and 24th St",
              "VehicleAtStop": "false",
              "AimedArrivalTime": "2016-09-03T07:02:00Z",
              "AimedDepartureTime": "2016-09-03T07:02:00Z"
            }
          }
        },
        ...

      ]
    }
  }
}


