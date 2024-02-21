const SiteList = ({ sites }) => {
    return (
        <div>
            <h2>Sitios seleccionados</h2>
            <table>
                <thead>
                    <tr>
                        <th>CODIGOSACE</th>
                        <th>DEPARTAMENTO</th>
                        <th>MUNICIPIO</th>
                        <th>ALDEA</th>
                        <th>CONTRATO</th>
                        <th>DISTANCIA (km)</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map(site => (
                        <tr key={site.CODIGOSACE}>
                            <td>{site.CODIGOSACE}</td>
                            <td>{site.DEPARTAMENTO}</td>
                            <td>{site.MUNICIPIO}</td>
                            <td>{site.ALDEA}</td>
                            <td>{site.CONTRATO}</td>
                            <td>{site.DISTANCIA_MIN} km</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SiteList;