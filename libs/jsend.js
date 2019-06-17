class JSend {
    constructor() {
        this.status = "fail";
        this.data = undefined;
        this.message = undefined;
        return this;
    }

    setSuccess(data = null) {
        this.status = "success";
        this.data = (data && data.isArray && data.length == 0) ? null : data;
        return this;
    }

    setFail(data) {
        this.status = "fail";
        this.data = data;
        return this;
    }

    setError(message) {
        this.message = message;
        this.status = "error";
        return this;
    }

    send() {
        let data = JSON.stringify({
            status: this.status,
            data: this.data,
            message: this.message
        });
        return data;
    }
}

module.exports = JSend;