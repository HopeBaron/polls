import { Choice } from "@/models/Choice";
import axios, { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";

export default class Service {
  endpoint!: string;
  operation_endpoint!: string;
  full_endpoint!: string;
  constructor(endpoint: string, operation_endpoint: string) {
    this.endpoint = endpoint;
    this.operation_endpoint = operation_endpoint;
    this.full_endpoint = this.endpoint + "/" + this.operation_endpoint;
  }
  async authenticate(username: string, password: string) {
    const response: { token: string; refresh: string } = await (
      await axios.post(`${this.endpoint}/token/`, {
        username: username,
        password: password,
      })
    ).data;
    return response.refresh;
  }
  async refresh(refresh: string): Promise<string | null> {
    const response: { token: string } = await (
      await axios.post(`${this.endpoint}/token/refresh/`, {
        refresh: refresh,
      })
    ).data;
    if ("token" in response) return response.token;
    return null;
  }
  async create(proposal: string, token: string): Promise<Choice> {
    const response = await axios.post(`${this.full_endpoint}/`, {
      headers: {
        Authorization: `Bearer ${await this.refresh(token)}`,
      },
      proposal,
    });
    return this.toChoice(response) as Choice;
  }
  async list(offset: number, limit: number): Promise<Choice[]> {
    const response = await axios.get(this.full_endpoint, {
      params: {
        offset: offset,
        limit: limit,
      },
    });
    return this.toChoice(response) as Choice[];
  }
  async get(id: number): Promise<Choice> {
    const response = await axios.get(`${this.full_endpoint}/${id}/`);
    return this.toChoice(response) as Choice;
  }

  async up_vote(id: number): Promise<Choice> {
    const response = await axios.post(`${this.full_endpoint}/${id}/upvote/`);
    return this.toChoice(response) as Choice;
  }

  async delete(id: number, token: string) {
    axios.delete(`${this.full_endpoint}/${id}/`, {
      headers: {
        Authorization: `Bearer ${await this.refresh(token)}`,
      },
    });
  }
  async down_vote(id: number): Promise<Choice> {
    return await axios
      .post(`${this.full_endpoint}/${id}/downvote/`)
      .then((response) => this.toChoice(response) as Choice);
  }

  private toChoice(response: AxiosResponse<any, any>): Choice[] | Choice {
    const data = response.data;

    if ("results" in data) {
      return plainToInstance(Choice, data.results);
    }
    return plainToInstance(Choice, data) as unknown as Choice;
  }
}
