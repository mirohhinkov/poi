const mapToClass: any = (source: object, resource: any) => {
  return new resource(...Object.values(source));
};

export default mapToClass;
