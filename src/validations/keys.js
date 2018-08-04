export const SteamKey = value => value.search('^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$') !== -1
export const OtherKey = value => value.length > 4
