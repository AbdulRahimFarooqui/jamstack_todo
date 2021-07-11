const React = require('react');
const netlifyID = require('netlify-identity-widget');

const IDcontext = React.createContext({});

exports.IDcontext = IDcontext;

const IdentityProvider = props => {

    const [user, setUser] = React.useState();

    React.useEffect(() => {
        netlifyID.init({})
    }, [])
    netlifyID.on("login", user => {
        netlifyID.close();
        setUser(user);
    });
    netlifyID.on("logout", () => {
        netlifyID.close();
        setUser();
    })

    return (
        <IDcontext.Provider
            value={{ identity: netlifyID, user }}
        >
            {props.children}
        </IDcontext.Provider>
    )
}

exports.Provider = IdentityProvider;