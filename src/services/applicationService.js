const Application = require('../models/applicationModel.js');

async function createApplication(ofertaId, usuarioId) {
  const existingApplication = await Application.findOne({
    id_oferta: ofertaId,
    id_usuario: usuarioId,
  });

  if (existingApplication) {
    throw new Error('Ya has aplicado a esta oferta de trabajo.');
  }

  const newApplication = new Application({
    id_oferta: ofertaId,
    id_usuario: usuarioId,
  });

  await newApplication.save();
  return newApplication;
}

async function getApplicationsByUser(usuarioId) {
  const applications = await Application.find({ id_usuario: usuarioId })
    .populate({
      path: 'id_oferta',
      select: 'titulo modalidad ubicacion salario',
      populate: {
        path: 'id_empresa',
        select: 'nombre',
      },
    })
    .sort({ fecha_aplicacion: -1 });

  return applications;
}

async function deleteApplication(offerId) {
 const deletedApplication = await Application.findOneAndDelete({
    id_oferta: offerId
  });

  if (!deletedApplication) {
    throw new Error('No se ha podido eliminar la candidatura');
  }

  return deletedApplication;
}

module.exports = { createApplication, getApplicationsByUser,deleteApplication };
