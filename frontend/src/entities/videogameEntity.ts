
export default class VideogameEntity {  
  public Rank: number;
  public Name: string;
  public Platform: string;
  public Year: number;
  public Genre: string;
  public Publisher: string;
  public NA_Sales: number;
  public EU_Sales: number;
  public JP_Sales: number;
  public Global_Sales: number;

  constructor(other: VideogameEntity) {
    this.Rank = other.Rank;
    this.Name = other.Name;
    this.Platform = other.Platform;
    this.Year = other.Year;
    this.Genre = other.Genre;
    this.Publisher = other.Publisher;
    this.NA_Sales = other.NA_Sales;
    this.EU_Sales = other.EU_Sales;
    this.JP_Sales = other.JP_Sales;
    this.Global_Sales= other.Global_Sales;
    return this;
  }
}
