import 'whatwg-fetch';

// I'd like to use local storage but (TODO) domain is currently google apps and therefore is very unsafe
// Using sessionStorage to store oauth token lets me iterate very fast/ with instant refreshes (no auth flow)
class TokenStorageAdapter {
    static get SOUNDCLOUD_STORAGE_KEY() {
        return 'soundcloud-token';
    }

    static get() {
        return sessionStorage.getItem(TokenStorageAdapter.SOUNDCLOUD_STORAGE_KEY)
    }

    static set(oauthToken) {
        sessionStorage.setItem(TokenStorageAdapter.SOUNDCLOUD_STORAGE_KEY, oauthToken);
    }

    static remove() {
        sessionStorage.removeItem(TokenStorageAdapter.SOUNDCLOUD_STORAGE_KEY);
    }
}

const baseAuth = {
    client_id: '3kqf8yDIaoXCLe4w4jzTord9THXIwHHh',
    redirect_uri: 'https://storage.googleapis.com/better-soundcloud-callback.appspot.com/callback.html'
};

SC.initialize(Object.assign({
    oauth_token: TokenStorageAdapter.get()
}, baseAuth));

function getFavoritesFromSoundcloud(): Promise<Object> {
    // TODO: add pager
    return SC.get('/me/favorites.json', {limit: 100});
}

function getMockedFavorites(): Promise<Object> {
    return fetch('https://storage.googleapis.com/better-soundcloud-callback.appspot.com/data/mocked-favorites.json')
        .then(response => response.json());
}

export function fetchFavorites() {
    if (/dev=1/.test(location.search)) {
        return getMockedFavorites();
    }

    return SC.connect()
        .then(function({oauth_token}) {
            TokenStorageAdapter.set(oauth_token);

            return getFavoritesFromSoundcloud();
        })
        .catch(function(error) {
            // Reinitialize upon authentication error TODO, only do this for authentication errors
            TokenStorageAdapter.remove();

            SC.initialize(baseAuth);

            return SC.connect().then(({oauth_token}) => {
                TokenStorageAdapter.set(oauth_token);

                return getFavoritesFromSoundcloud();
            });
        });
}
