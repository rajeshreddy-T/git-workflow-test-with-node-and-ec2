const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

// app.use(bodyParser.json());
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {customCss}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
let tasks = [
    {
      id: 1,
      task: 'task1',
      status: 'completed'
    }    
  ];


app.get('/', (req, res) => {
  res.send('CI / CD worked the code is deployed into ec2 and running!');
});

app.get('/api/products', (req, res) => {
    console.log('get todo list  called!!!!!')
    res.json(tasks);
  });
  
  app.post('/api/product', (req, res) => {
     const task = req.body.task;
     task.id = randomId(10);
     tasks.push(task);
     res.json(tasks);
  })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});