module.exports = class product {
  id = 0;
  constructor(
    name,
    small_desp,
    long_desp,
    logo,
    url,
    created_on,
    created_by,
    updated_on,
    updated_by
  ) {
    this.name = name;
    this.small_desp = small_desp;
    this.long_desp = long_desp;
    this.logo = logo;
    this.url = url;
    this.created_on = created_on;
    this.created_by = created_by;
    this.updated_on = updated_on;
    this.updated_by = updated_by;
  }
};
