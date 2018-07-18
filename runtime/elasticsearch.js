const elasticsearch = require('elasticsearch')

const client = new elasticsearch.Client({
  host: 'devops-1.chinacloudapp.cn:9200'
})

module.exports = client
