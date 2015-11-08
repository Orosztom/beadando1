// controllers/todo.js
var express = require('express');
var router = express.Router();

//Viewmodel réteg
var statusTexts = {
    'new': 'Új',
    'ready': 'Kész',
    'pending': 'Szerkesztve',
};
var statusClasses = {
    'new': 'danger',
    'ready': 'success',
    'pending': 'warning',
};

function decoratetodos(errorContainer) {
    return errorContainer.map(function (e) {
        e.statusText = statusTexts[e.status];
        e.statusClass = statusClasses[e.status];
        return e;
    });
}

router.get('/list', function (req, res) {
    req.app.models.todo.find().then(function (todos) {
        console.log(todos);
        //megjelenítés
        res.render('todos/list', {
            todos: decoratetodos(todos),
            messages: req.flash('info'),
        });
    });
});
router.get('/new', function (req, res) {
    var validationErrors = (req.flash('validationErrors') || [{}]).pop();
    var data = (req.flash('data') || [{}]).pop();
    
    res.render('todos/new', {
        validationErrors: validationErrors,
        data: data,
    });
});

//próbálkozás...
router.get('/edit/:id', function (req, res){
    var id = req.params.id;
    
    req.app.models.todo.findOneById(id)
    .then(function (todo) {
        //var validationErrors = (req.flash('validationErrors') || [{}]).pop();
        //var data = (req.flash('data.Error') || [{}]).pop();
        console.log(todo)
        res.render('todos/edit', { todo: todo,});     
    })
    
    
});

router.post('/edit/:id', function (req, res){
    
    var id = req.params.id;
    
    console.log(req.app.models.todo);
    
    req.app.models.todo.update({id: id}, {
        status: 'pending',
        assignedTo: req.body.assignedTo,
        description: req.body.leiras
    })
    .then(function (todo) {
        req.flash('info', 'Tennivaló sikeresen módosítva.');
        res.redirect('/todos/list');
    });
    /*
    req.app.models.todo.create({
            status: 'updated',
            assignedTo: req.body.assignedTo,
            description: req.body.leiras
        }).then(function (todo) {
            
        })
        .catch(function (err) {
            console.log(err);
        });
    
    req.app.models.todo.findOneById(id)
    .then(function (todo) {
    
        todo.destroy()
        
        req.flash('info', 'Tennivaló sikeresen módosítva.');
        res.redirect('/todos/list');
    });
    */
});

router.get('/delete/:id', function (req, res){
    
    var id = req.params.id;
    
    req.app.models.todo.findOneById(id)
    .then(function (todo) {
    
        todo.destroy()
        
        req.flash('info', 'Tennivaló sikeresen törölve.');
        res.redirect('/todos/list');
    });
    
});

router.post('/new', function (req, res) {
    // adatok ellenőrzése
    req.sanitizeBody('leiras').escape();
    req.checkBody('leiras', 'Hibás leírás').notEmpty().withMessage('Kötelező megadni!');
    req.sanitizeBody('assignedTo').escape();
    req.checkBody('assignedTo', 'Helytelen személy').notEmpty().withMessage('Kötelező megadni!');
    
    
    var validationErrors = req.validationErrors(true);
    console.log(validationErrors);
    
    if (validationErrors) {
        // űrlap megjelenítése a hibákkal és a felküldött adatokkal
        req.flash('validationErrors', validationErrors);
        req.flash('data', req.body);
        res.redirect('/todos/new');
    }
    else {
        // adatok elmentése (ld. később) és a hibalista megjelenítése
        req.app.models.todo.create({
            status: 'new',
            assignedTo: req.body.assignedTo,
            description: req.body.leiras
        })
        .then(function (todo) {
            req.flash('info', 'Tennivaló sikeresen felvéve!');
            res.redirect('/todos/list');
        })
        .catch(function (err) {
            console.log(err);
        });
    }
});

module.exports = router;