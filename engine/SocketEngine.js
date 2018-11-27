const socketRequest = Symbol('Application#socketRequest');
const socketResponse = Symbol('Application#socketResponse');

class SocketEngine {

    /**
     * 响应请求
     *
     * @static
     * @memberof SocketEngine
     */
    get RESPONSE_MESSAGE() {
        if (!this[socketResponse]) {
            this[socketResponse] = 'responseMessage';
        }

        return this[socketResponse];
    }

    /**
     * 发起请求
     *
     * @static
     * @memberof SocketEngine
     */
    get REQUEST_MESSAGE() {
        if (!this[socketRequest]) {
            this[socketRequest] = 'requestMessage';
        }

        return this[socketRequest];
    }


    constructor() {

    }

    
}

module.exports = new SocketEngine();