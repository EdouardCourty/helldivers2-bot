import InMemoryStorage from "../Service/InMemoryStorage.js";
import helldivers2 from "helldivers2-api";

export default class Helldivers2CacheRepository {
    static async getCurrentWarId() {
        const cacheWarId = InMemoryStorage.get('current_war_id');

        if (null !== cacheWarId) {
            return cacheWarId;
        }

        const currentWarId = await helldivers2.getCurrentWarId();
        InMemoryStorage.set('current_war_id', currentWarId, 600); // 10 minutes

        return currentWarId;
    }
}
