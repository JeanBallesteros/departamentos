const express = require('express')
const router = express.Router()
const departamentsJSON = require('../json/departaments.json')

/* REQUEST HTTP API RESTFUL */

/* Endpoint: http://localhost:4000/api/v1/departaments */
router.get('/', (req, res)=>{
 res.json(departamentsJSON);
});

/* Ejercicio1: Dependiendo del código del departamento que
el usuario ingrese como parámetro en la URI,
cargar todos los municipios que le corresponden */

/* Endpoint: http://localhost:4000/api/v1/departaments/5 */
router.get('/:departamentId', (req, res)=>{
  const {departamentId} = req.params;
  const departaments_municipalities = departamentsJSON.filter(
    (departament) =>
      departament['c_digo_dane_del_departamento'] === departamentId
  );
  res.json(departaments_municipalities);
});


/* Consultar los departamentos que tienen un nombre con más de 15 carácteres */
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/name/ */
router.get('/:departament/name', (req, res)=>{
  const departaments = departamentsJSON.filter(
    (departament) =>
      departament['departamento'].length > 11
  );

  res.json(departaments);
});

/* 1. Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* 2. Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON*/
/* 3. El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
/* 4. Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */


/* Mostrar los departamentos cuyo código dane es mayor a 15 y menor a 20 */
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/coddane/ */
router.get('/:departament/coddane', (req, res)=>{
  const departaments = departamentsJSON.filter(
    (departament) =>
      parseInt(departament['c_digo_dane_del_departamento']) > 15 && parseInt(departament['c_digo_dane_del_departamento']) < 20
  );

  res.json(departaments);
});


/* Como parámetro opcional el usuario ingresa el código del departamento y se cargan sus municipios, validar si el usuario no ingresa el
código traer todo el JSON*/
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/coddepartament */
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/coddepartament?codDepartamento=17 */
router.get('/:departament/coddepartament', (req, res)=>{
  const {codDepartamento} = req.query;

  if(codDepartamento){
    const departaments = departamentsJSON.filter(
      (departament) =>
        departament['c_digo_dane_del_departamento'] === codDepartamento
    );

    res.json(departaments);
  }else{
    res.json(departamentsJSON);
  }
});


/* El usuario ingresa como parámetro opcional el nombre del municipio que desea consultar de lo contrario por defecto se cargan los
municipios de Caldas */
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/municipalities?nameMunicipality=Mariquita */
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/municipalities */
router.get('/:departament/municipalities', (req, res)=>{
  const {nameMunicipality} = req.query;

  if(nameMunicipality){
    const municipalities = departamentsJSON.filter(
      (municipality) =>
        municipality['municipio'] === nameMunicipality
    );

    res.json(municipalities);
  }else{
    const municipalities = departamentsJSON.filter(
      (municipality) =>
        municipality['departamento'] === "Caldas"
    );

    res.json(municipalities);
  }
});


/* Mostrar todos los departamentos cuyo nombre inicia por la letra "C" */
/* Endpoint: http://localhost:4000/api/v1/departaments/departament/letrac */
router.get('/:departament/letrac', (req, res)=>{
  const departaments = departamentsJSON.filter(
    (departament) =>
      departament['departamento'].charAt(0) === "C"
  );

  res.json(departaments);
});

module.exports = router