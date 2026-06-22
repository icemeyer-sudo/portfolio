const isAuthenticated = (req, res, next) => {
    
    if (req.session.user) {
        next(); // session valide → on continue
    } else {
        res.redirect('/login'); // pas de session → retour login
    }
};

export default isAuthenticated;