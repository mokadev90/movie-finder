class Credit {
  constructor(
    public readonly id: number,
    public readonly knownForDepartment: string,
    public readonly name: string,
    public readonly originalName: string,
    public readonly popularity: number,
    public readonly profilePath: string,
    public readonly castId: number,
    public readonly character: string,
    public readonly creditId: string,
    public readonly order: number,
  ) {}
}

export default Credit;
