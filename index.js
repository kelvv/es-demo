const es = require('./runtime/elasticsearch')
async function work1 () {
  let results = await es.search({
    index: 'venues',
    type: 'venues',
    body: {
      query: {
        match: {
          'name.cn': '糖果'
        }
      }
    }
  })
  console.log(JSON.stringify(results))
  console.log(results)
}

async function work2 () {
  let results = await es.search({
    index: 'follow',
    type: 'follow',
    body: {
      'query': {
        'bool': {
          'must': [
            {
              'match': {
                'targetId': '5ad99eb6bf2376c17e8123a7'
              }
            }
          ],
          'filter': {
            'range': {
              'createdAt': {
                'gte': '2018-04-20',
                'lte': '2018-04-26'
              }
            }
          }
        }
      },
      'aggs': {
        'follows': {
          'date_histogram': {
            'field': 'createdAt',
            'interval': 'day',
            'format': 'yyyy-MM-dd',
            'extended_bounds': {
              'min': '2018-04-20',
              'max': '2018-04-26'
            }
          }
        }
      }
    }
  })
  console.log(JSON.stringify(results))
  console.log(results)
}

async function work3 () {
  let results = await es.search({
    index: 'venues',
    type: 'venues',
    body: {
      'query': {
        'bool': {
          'must': [
            {
              'match': {
                'isValid': 1
              }
            },
            {
              'match': {
                'isDeleted': 0
              }
            },
            {
              'term': {
                'cityId': '58d1ecade841a18ba5399026'
              }
            }
          ],
          'filter': {
            'geo_distance': {
              'distance': '2000km',
              'location': {
                'lat': 31.2360130240364,
                'lon': 121.44686167489
              }
            }
          }
        }
      },
      'sort': {
        '_geo_distance': {
          'location': {
            'lon': 121.44686167489,
            'lat': 31.2360130240364
          },
          'order': 'asc',
          'unit': 'm'
        }
      },
      'size': 20
    }
  })
  console.log(JSON.stringify(results))
  console.log(results)
}

async function work4 () {
  let results = await es.search({
    index: 'venues',
    type: 'venues',
    body: {
      'query': {
        'function_score': {
          'query': {
            'geo_distance': {
              'distance': '5km',
              'location': {
                'lat': 31.2360130240364,
                'lon': 121.44686167489
              }
            }
          },
          'functions': [
            {
              'filter': {
                'term': {
                  'searchTags.normal': '啤酒吧'
                }
              },
              'weight': 2
            },
            {
              'filter': {
                'term': {
                  'searchTags.normal': 'KTV'
                }
              },
              'weight': 1
            },
            {
              'random_score': {
                'seed': '$id'
              }
            }
          ],
          'score_mode': 'sum',
          'boost_mode': 'multiply'
        }
      }
    }
  })
  console.log(JSON.stringify(results))
  console.log(results)
}

// work1()
// work2()
// work3()
work4()
