const mapToClass = (source: any, resource: any) =>
  new resource(...Object.values(source));
export default mapToClass;
