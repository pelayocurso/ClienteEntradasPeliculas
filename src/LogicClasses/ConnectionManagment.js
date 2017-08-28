export class ConnectionManagment {
  private host;

  constructor(host) {
    this.host = host;
  }

  public post(object) {
    axios.post(host, object)
    .then( (response) => {
      return response.data;
    })
    .catch( (error) => {
      return {
        message: 'Error al conectar al servidor',
        error: error
      };
    });
  }

  public getAll() {
    axios.get(host)
    .then( (response) => {
      return response.data;
    })
    .catch( (error) => {
      return {
        message: 'Error al conectar al servidor',
        error: error
      };
    });
  }

  public get(id) {
    axios.get(host + '/' + id)
    .then( (response) => {
      return response.data;
    })
    .catch( (error) => {
      return {
        return {
          message: 'Error al conectar al servidor',
          error: error
        };
      }
    });
  }

  public put(id, object) {
    axios.put((host + '/' + id), object)
    .then( (response) => {
      return response.data;
    })
    .catch( (error) => {
      return {
        message: 'Error al conectar al servidor',
        error: error
      };
    });
  }

  public delete(id) {
    axios.get(host + '/' + id)
    .then( (response) => {
      return response.data;
    })
    .catch( (error) => {
      return {
        message: 'Error al conectar al servidor',
        error: error
      };
    });
  }
}
