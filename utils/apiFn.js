class APIFn{
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;

    this.count = query.length;
  }

  filter() {
  	const queryOb = { ...this.queryString };
  	const excludeQuery = ['page','limit', 'sort', 'fields'];
  	excludeQuery.forEach(el=> delete queryOb[el]);
  	const queryStr = JSON.stringify(queryOb).replace(/\b(gte|gt|lte|lt)\b/g, m=> `$${m}`);
  	this.query.find(JSON.parse(queryStr));
  	return this;
  }

  sort() {
  	if (this.queryString.sort) {
  		const sortBy = this.queryString.sort.split(',').join(' ');
  		this.query.sort(sortBy)
  	};
  	return this;
  }

  fields() {
  	if (this.queryString.fields) {
  		const fields = this.queryString.fields.split(',').join(' ');
  		this.query.select(fields)
  	}else{
  		this.query.select('-__v');
  	};
  	return this;
  }

  paginate() {
  	const page = (this.queryString.page * 1) || 1;
  	const limit = (this.queryString.limit *  1) || 10;
  	const skip = (page-1) * limit;
    this.query.skip(skip).limit(limit);
    return this;
  }
  
}

module.exports = APIFn;