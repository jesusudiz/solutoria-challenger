
import { Op } from 'sequelize';
import { sequelize, Indicadores } from '../db.js';

export const allData = async (page, pageSize) => {
  const offset = (page - 1) * pageSize;

  const data = await Indicadores.findAll({
    offset,
    limit: pageSize,
  });

  const totalCount = await Indicadores.count();
  const totalPages = Math.ceil(totalCount / pageSize);
  const result = {
    paginas: totalPages,
    indicadores: data
  }
  return result;
};

export const allDataByCodeIndicator = async (codeIndicator, page, pageSize) => {
  const offset = (page - 1) * pageSize;

  const data = await Indicadores.findAll({
    where: {
      codigoIndicador: codeIndicator
    },
    offset,
    limit: pageSize,
  });

  const totalCount = await Indicadores.count({
    where: {
      codigoIndicador: codeIndicator
    }
  });

  const totalPages = Math.ceil(totalCount / pageSize);
  const result = {
    paginas: totalPages,
    indicadores: data
  }
  return result;
};



export const dataId = async (id) => {
  const data = await Indicadores.findByPk(id)
  return data;
}

export const dataByName = async (name, limit, offset) => {
  const data = await Indicadores.findAll({
    where: {
      nombreIndicador: {
        [Op.iLike]: `%${name}%`,
      },
    },
    limit,
    offset,
  });

  const totalItems = await Indicadores.count({
    where: {
      nombreIndicador: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });

  const totalPages = Math.ceil(totalItems / limit);

  const result = {
    paginas: totalPages,
    indicadores: data
  }
  return result;
};


export const dataByDate = async (date, limit, offset) => {
  const data = await Indicadores.findAll({
    where: { fechaIndicador: date },
    limit, offset
  })

  const totalItems = await Indicadores.count({
    where: { fechaIndicador: date }
  })


  const totalPages = Math.ceil(totalItems / limit);

  const result = {
    paginas: totalPages,
    indicadores: data
  }
  return result;
}


export const dataByYear = async (year, limit, offset) => {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;

  const data = await Indicadores.findAll({
    where: {
      fechaIndicador: {
        [Op.between]: [startDate, endDate]
      },

    },
    limit,
    offset
  });

  const totalItems = await Indicadores.count({
    where: {
      fechaIndicador: {
        [Op.between]: [startDate, endDate]
      }
    }
  });
  const totalPages = Math.ceil(totalItems / limit);
  const result = {
    paginas: totalPages,
    indicadores: data
  }
  return result;
};




export const searchDataByDateRange = async (dateStart, dateEnd, limit, offset) => {
  const data = await Indicadores.findAll({
    where: {
      fechaIndicador: {
        [Op.between]: [dateStart, dateEnd],
      },
    },
    limit,
    offset,
  });

  const totalItems = await Indicadores.count({
    where: {
      fechaIndicador: {
        [Op.between]: [dateStart, dateEnd],
      },
    },
  });

  const totalPages = Math.ceil(totalItems / limit);

  const result = {
    paginas: totalPages,
    indicadores: data
  }
  return result;
};

export const createData = async (newData) => {
  const data = await Indicadores.create(newData);
  return data;
};

export const updateData = async (id, updatedData) => {
  const data = await Indicadores.findByPk(id);

  if (!data) {
    throw new Error("The requested indicator does not exist.");
  }

  data.nombreIndicador = updatedData.nombreIndicador || data.nombreIndicador;
  data.codigoIndicador = updatedData.codigoIndicador || data.codigoIndicador;
  data.unidadMedidaIndicador = updatedData.unidadMedidaIndicador || data.unidadMedidaIndicador;
  data.valorIndicador = updatedData.valorIndicador || data.valorIndicador;
  data.fechaIndicador = updatedData.fechaIndicador || data.fechaIndicador;
  data.tiempoIndicador = updatedData.tiempoIndicador || data.tiempoIndicador;
  data.origenIndicador = updatedData.origenIndicador || data.origenIndicador;

  await data.save();

  return data;
};

export const deleteData = async (id) => {
  try {
    const indicator = await Indicadores.findByPk(id);

    if (!indicator) {
      throw new Error('The requested indicator does not exist.');
    }

    await indicator.destroy();

    return indicator
  } catch (error) {
    throw new Error('Error deleting the indicator.');
  }
}
