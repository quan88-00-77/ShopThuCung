const moment = require('moment')
module.exports = {
    formatDate: function (date, format="dddd, MMMM Do YYYY, h:mm:ss a") {
      return moment(date).utc().format(format)
    },
}