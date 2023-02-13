import axios from "axios";

const url = "https://looking.fly.dev/";

export function getAllUsers() {
  try {
    const result = axios.get(`${url}/client/getuser`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateClient(id, data) {
  try {
    const result = axios.patch(
      `https://looking.fly.dev/client/updateuser/${id}`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function allPropierties() {
  try {
    const result = axios.get("https://looking.fly.dev/properties");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateAvatar(id, data) {
  try {
    const result = axios.patch(
      `https://looking.fly.dev/client/updateavatar/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function getAllTenants() {
  try {
    const result = axios.get("https://looking.fly.dev/tenant/gettenant");
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function getUserById(id) {
  try {
    const result = axios.get(`https://looking.fly.dev/client/getuser/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function getTenantById(id) {
  try {
    const result = axios.get(`https://looking.fly.dev/tenant/gettenant/${id}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateTenant(id, data) {
  try {
    const result = axios.patch(
      `https://looking.fly.dev/tenant/updatetenant/${id}`,
      data
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export function updateAvatarTenant(id, data) {
  try {
    const result = axios.patch(
      `https://looking.fly.dev/tenant/updateavatar/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
