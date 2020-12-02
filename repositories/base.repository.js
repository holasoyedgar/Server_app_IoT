class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    async get(id, populate = '') {
        return await this.model.findById(id).populate(populate);
    }

    async getAllPopulated(parameters, pageNumber, populate) {
        const options = {
            page: pageNumber || 1,
            limit: 10,
            populate
        };
        return await this.model.paginate(parameters, options);
    }

    async getAll(pageNumber) {
        const options = {
            page: pageNumber || 1,
            limit: 10,
        };
        return await this.model.paginate({}, options);
    }

    async getAllWithParameters(parameters, pageNumber) {
        const options = {
            page: pageNumber || 1,
            limit: 10,
        };
        return await this.model.paginate(parameters, options);
    }

    async getList() {
        return await this.model.find();
    }

    async create(entity) {
        return await this.model.create(entity);
    }

    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, {
            new: true,
        });
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id);
        return true;
    }

    async updateOne(query, entity) {
        return await this.model.updateOne(query, entity, {
            new: true,
        });
    }
}

module.exports = BaseRepository;