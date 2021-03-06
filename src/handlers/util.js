import HandlerStructure from '../structures/handler';

/**
 * Util handler.
 */
class UtilHandler extends HandlerStructure {
    /**
     * Create util handler.
     * 
     * @param {Object} client - DMDb client extends Eris
     */
    constructor(client) {
        super(client, 'util');
    }

    /**
     * Get util.
     * 
     * @param {string} utilName - Util name
     * @returns {Object} - Util Object
     */
    getUtil(utilName) {
        return this.util[utilName];
    }
}

export default UtilHandler;
