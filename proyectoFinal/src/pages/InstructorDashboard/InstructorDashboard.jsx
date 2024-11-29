import styles from "./InstructorDashboard.module.css";
import { useEffect, useState } from "react";


const InstructorDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const ciInstructor = localStorage.getItem("ci"); // Reemplaza con el CI del instructor actual
        const response = await fetch(`http://localhost:5000/instructor/${ciInstructor}/clases`,{
          headers: {
            'Authorization': 'Bearer tu_token_aqui',
            'Content-Type': 'application/json'
          }
        })
        console.log(response)
        if (!response.ok) {
          throw new Error("Error al obtener las clases.");
        }
        const data = await response.json();
        console.log(data)
        setClasses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClasses();
  }, []);
  
    return (
      <div className={styles.container}>
        <div className={styles.headerBar}>
        <div className={styles.logo}>Escuela de Nieve</div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEUFLmb///8ALGUAEVoAImAAJ2LX2+KAiqMNMmkAAFYAGl0AKmQAJWIAF1wAH18AIF9TZIi6v8ubpLeRma4ACVgAFVsAEloADVnh4+hmdJMABFcWNWr09fYAAFfBxtLR1Nw5TXinrr/r7fG1usdJWoDLz9l2gZxcaosoQnKEj6dpd5VFWIB3g54kP3Cgp7kwR3QAAEySJMqDAAAQwklEQVR4nNVd6ZqqOBDFACph0xYElavi2tp297z/040KahK2pBLUPv/ufGPDIUvtVVrnOVjF8ZBEHMdPerLW7p9P4mG62/9iK9J1FxPQdd2yfje7n3U3afcV2mOYbD8mZhS52HBspJXCNg0P65Y5GM1Xrb1HOwzjn6NjhZ5TwYwBMn03CCYfi1beRT3DeL33I15yBE3HG+uDVP3pVMywO1pa2BEkRywmDmY9xUupkmF3pEW+DaV3Y2noXm+r8K2UMVx99OXp5TDG3kHZdlXEcD4IPEX0rkD+dLlW82oqGCYje2wqpJfBdsOeioWUZxifLE/04uSEYe3lrx1ZhvHeMtqhd4UTLGVvHTmGZ35g0cAJM5LkKMPwCfwusOU4whkmp+AZ/K4cgz1cbwUz/ND9J/G7wJn2nsxwbuMn8rvA19MnMkwmU5XinRPjJUg8Qhiun3LBFGFOR09hmAz0lgR8M/Cn+DIKM0zd1yxgBtsSXkZRhpPohfwucJeCgkOMYdd+pogohzketscwtV52AklYQrJRhOFAfzW3HPhXYKfyM0z6bRoRYjDHXfUMu8ELhHwlkJWqZphOX02KwfSkluHh3QiexcZAJcPd+NV8SuBtuCIeXAw3zzYk+GD0eSjyMNx4r+ZSAXPGQZGD4dsS5KPYzPCNCZ4pNm/URoZvTZBnFZsYvjlBDooNDN+eYPNGrWe4e08xQcP5gjM8qBX0yDadC8yquD4Q/gbKUJkuihwP6xGeLQf7yWSyHyxnRqS74pHwKuA6HbWGYVcJQWTgAO1HbFJJEs8/jt9TV01QNUghDJNA/sm2Fzm7dbW5mswP3xZWEHucVkfhqhn25SPy0feo2VJdpV+BdAASWZWfsZLhQNKit12vx2uIrz5muuRC2jNRhqmcT8aMPsXC8NuBpCPdO4ox7FoyT7OjL/GIXzyZSnEMKj5pBUMZiYXGv7CIZry3ZM6+Ve7xL2c4kXD8ej48TWTxGcIfbH/zM0zhrntbzF1bfHQI36peqeAvY5i48Id88zsyyyET2iqVimUMB+DPKLmAGdJ/0NNYKjJKGK6hgsJ059XvvdquR7uzSrpcbvbHQzqvCQTG39BrwCv5wkWGCTT84n9W6RWLj705DbFnnM0K+2Jg+NiN3K/RvMqy20ONGqu4T4sMJ8A9WuWhnR89vdSMMP1QH6TlJEdAeWx/NjOcAy2KqPQIdk9RXcwYmdjal27tNZAiLsSICwxt2DG3Pkpec76cGo1b3hn305Lfbqeww1JQwVmGHzC/hfVTwu+TU51G2Cj5+QJG0ZnUM1zBjnhQfMPuMuLfDQjbxdB1F6Z3sJcNw/AEuqejYoLEyRIzh87KeuEm3oJudXNZxzAG2fVuQVvamuJfypkWNsIQdN3otF5MM9xDJIVfEBM9kI2AxoVw2QdE+UC0ZkMxjCHfrKDSJ0uol9VxWK32CPFIh9QiUgwhS4imzPmJbbh1gCzW8voEeDfsfhVD0BJOmUsQdj3cgFi5uoLsU2oRSYaQJWRtsrmU++OM4ED/wTXg8qNOIsEQsoTMqZYneBY9DMUJwOlHJoYRDE+AP8WI1yZVy9MvaPBUMNI1AThTbUImPhgmgM/v03s0btBCvDTunrFooMhkAw0Buk3w+PIPhiPxixlhSoAlTVp7biE3xQvQP3pnfInfp86+hCHAgRjSH3vZdFNxMmS/HOSCeJgYd4ZzcZ2bkfWHRkHPy1BzaN1yJ35DePfDfGc4EN8KOmW7bptNZ26GmkvdNsk/4Xd7SP0bw5W42GGWEDXvcn6GmkXpbz1xRV6/+d1vDD/E75kxtYQnjj8gwJB2uCTirpW7JXxjKB4tpIV9/W3gZMg1vGSa/7tu1d2U/PNHcXXLSiiGAHsaU6+wrDvGs+PkirxeMtln/zz+1lEMqQ8ovoh4TTEciW90TL7BvO4L2YzVfceh7qkepb1thC9Cc0Ax1IQ3qbEjX+Cz7vcwhigizbK1uM05JRkCNqlO6h3zWhsHxpBZxEhYIcm3acZQfJMih3z8snYLABmiKfn/it81+TbVON6wDD75gRvUKiBD+i6bC8dOUfhgCFD8qE3aYHdBGdIqhXhYMRzeGYofY2SQD2+w4NDnPMMwvzuG+b+bgkABGYITjxhl++zKUNx94ZC5HY0bCLkZbhL/v/zfTY+ljkIqvAxZwPTKECAMySPC7RwQ0NquQOQ2bTKvS3B1A2qw30akYsztZhBlSG9T8VTGq7y4MPwR1ropWcEvTIUZUlsFcJZ2OUOAqCFzVvkPiDBDKlQm7ma57nINtPwGGfDl/7bCDJFOPGcungRzsS80kJON2j38H0iYoRYQumks7v4Ot1eGgG8zJuS9wAe6ZaPwM6TyV8RX4uKt0UDmPan2d/k/rf25vIJfR6Q2iyZ8mi5iWwOll1jA42Fn4P8BdeC/xP0Q2pWhKfxpkCt1xQmAurQBkaPzVaN1EnF5j8gAHSTcwQ3KIQV40vnC0ETO0f25v8RzAU4ifiAy+tdgipThrNVonaH4VSq7d/iBTPI8iDP0R2eG4jo7w1B9qzYCHvEkwKVv7M4MAUEBk8y+AIQD+IGwHMPzedIgu+zvMDzfiVrnVzz35e8wPEturYPF44Z/iGG00gDa3l9iqMfaChAl/0MM3bkGsEmkGIrpiNIM8fDJDO1oIFQyooIhQKUBM0Th56Kz2gu0s5Nm6I20ISCREMjQy6297bfLu1WlGfpPZOhMH/7dFHOqmH+IoR0MSN9n0uMrNvw7DN0ZW5IYb3gaT/0Vhh6ddpBjPmu+5P4GQ/PfqaK+6cdtOo5/gSGKvqrL1JKmooU/wBDPair2zoi/agP0b8/Q0MvKoWjM+zXWzZszNK0dV7+xj6DSzfDWDG39i7cmODlWHcc3Zlhaq1WN7rI8EUEFw3ZsCyMQ7Ya7NsuO47taT7Y1AYw4GpX0eH9Phmi8hBXlryaFijB5G3+o3E+DPEOia8TvmN6qKvw0ihk6oK7iD6wdKrNDCUOV/lJ7KjHEIMeBPI5K/KXiualVDFH4rWJW02rwcHNIM3RUxi08I1XA74LtZ4jUMLzGLcTzhejYU87Qtg7si0ogvQ3+8uUYOkdl8UNbpMU2D7LsAmQT/wkaP1wAyoHIhNEsBmzur2VpyhBndKh4OiQGnF7i+OLigiq07WXn2NTVImNDxdOhcXxALoZG5mJAbjhuUHcaNBcDEloh82m2Es2rGkHl0IrXIV5SmTXQAY7k0s34QeVE9YU3m7lXkdcGUfu4EW6lHpTntQEK86hPO2tx6IVFWGGAVGZ3mOWXBnL5pbvsAjANlcj+JiUOAXvtkuh9YSieukeJ/KyWwdwfegpxur6TQdaKA3KEUSdjKH7fU3neWeWcL2c1sdheFwyTpqb4QlyTqC8MAVpNRPqxrwcRlXcthCKT7lRXEfFi8+t1cc2MEy+4oa6aTJsKlI7y9S+vRGmHkJqJ+MZQXOZTNTOL67N9lbZFVobjkR5z8fy7rHRJA/6YKs7L5AVVVCqJ7JuTeeyAY5gVgWa1a+ISkSqayW45ujBYClkxnUk1Wx8LHyV3fWcIENpUgWdmnlR0SIUg8zuEZNgKoP7qyYNhT9guoWRxvoNCRTOKO6trDwX6JIinIuf3VMZwIa49U9s0a6xsqxqBnZlJ9K4Xl2j57/OXAmTfUq1psqauxbaMIGQdNuglXANKglYkQ/FtSl+d3eyuMmZ9BcjKjOjsBnGf502Y5gy34E2QI7/LkRJc/xLdSU68p4L3QzHMdAgh0FcnuHNtFQIq/g9w6t568NwYAvxYdHuaH3gD6TI4VKvCRNzAu5s/N4aAbcB0tK3t/SGMkApAAr6/u2YYApoOaBG1iLF4X4dqBFSIPAE0a727A+8MAdcxs4jpQ/eTuGGuYAYdALqq+ncvxOPGAjgFGSXm0ajSAzmB71mnJq3/gXp93W25B0OASEQe9Sb3dmY2MIaRFxgiTP8eEP8jLMsHQ8iXYnruJSh/xag+1ascq1kuU5lWhbXdfSpANE4k5CqkCI1uydVZhfl9JT56uTPU899Omc8jLqqpHlYEwwWgjyZrMcU4f03h0cvHXFwhi8k0OgIqOEl9i9SNIBKN7V8aezlFM2hO2ntgfh8WzRIcQvqXkvcDyXALaaBtMXtqdWuyi9xv3tMYb269v5HFZEuDGoxj8uNS+i1A6jPOlA7ZKNmOljwDZ+LJPW/PcViHHaSPMBX8oxmCFtEsjCPY3TVAW/+sGH5wx3zwyNrHS/Z/BvWCxlRjcNosBy2iv+8wWEf3L2/j8aR6s257TvhIVinmOoD6eTNOP5ohR//KEriFwQ+rr8fxQY5rfY3m7NWabH/2+pgYneChQjIOrCc7vYRsX31YYXZUvDbpqhjTcwPvd386jC449CZf9nRMjfUw/xXnYyxANifbvJlhCDCiLiiZzpec2DFjtmP4vud5vm84TAzCDDbFmEAXNjSIaatfmG8B6BR6Qdl8i3jCMb/jAicoG2LWhc23YEcjFGeUAKPypTNK4pOOm+4u5P0blMmUhbhZn70IuxkKDFPgmJ7yOTNJ+mt51SRtP7JHpeoddM6Mv2P/UtGJC/VGuAWhkSH+WEahX0zasQ03+D5UJDOOgI4tqstEFUPgZVM37ymZjwbOdOxiz7/E6H0PhwFe9oaVyvkEmsESFQMLJY74EXQ8Re3Mrs5qMUxHh9Pu1Bv9rLd1lscKPLPLKdlHZaGG2nardUBq5q4J1AkzCEtUxDKGoDkXGV47O69kj1bMPxzBvbuvnH9Ie5FrGUp5d+WqESTSAFF5mL2cIXCwVf4k+BxS8OTDC1jjuZYhUKu/4SWzZN2KXJCqsG1Pbm788+cBV86QrwxM/8oOWX7uTGdmJAYPw5V4dgf70CfO5a4ZPV6dXCA31jnD82arp5XPqEmfSKEKKgVk4MAejNZdmmfSnX9MZlPXl53gfgWuEcJ1CSInVWFdZPpYj3D/d3OZirAfLGdepLulw0lBMDY1LGpTYAZKCw0QuoyRPcMETgKtgtmvI1Gf5LNps+ujKtizWpdsPcOk32rLQCVA0/rE1oZErWT27hRtvSFztykV7d0poiaCjQzffKOi5tzr5nTCd17Fxi3KxfCNKTZvUT6G543aZptZOOyGW5SfYSf5gjq/2oQ546p/4Ezr3ciZi23A6PP13uBNXD6Bpj23CFyni0IYni2NFovwxDHldunxJ58vQKOo2wGqsQfhDDurWZs1zSJwsEB3CqECguN7HEb3S6S/j1iJxPoNdmpJyoZChp34+9U71cGCrljhMpcTPDKkAlFpbEIpw87ihReOAyitgpQq9V50GlG0B7QQAxVjLT5focT5JiioBSw3G0lGGcRhWoUsi1YZXnqrPdNqRNESWkgNLxmsanXYBtyGLqjtMOx0hrPwKVcOdktyyp7C8Kzj9MO21xHJ8ZNleOY4G7e5jgh7IgnxbTA879VlSc9KNbDHs1T6/VQUJy/2ddl5YPjWUqTJaxXUlF+vRn1d7UKarttT02hDVYF5ZztREsy9wvasjarafnUMO51kPZhiQGs0lh62lj8KG/gpZHjBehCGEoFrZLj6MlXbn1AxwzOGh9kUAwLYyMGRsVsDrId6qGd4xmq9+7ZC/jg9Mr1wiiap0h4+N7TC8IJk+3PUrDH2jbruR7bj47Fl7IsVJ8rQGsMrksVwtPvtW5HuYuz5BDB2dd1yfo+H9UL5xqTQLsMbVvF8OByRGA6HcSubsoD/AVkJOyC0Pbo5AAAAAElFTkSuQmCC"
          alt="Usuario"
          className={styles.headerImage}
        />
        
       
      </div>
      <div className={styles.container}>
      <h1>Bienvenido al Panel del Instructor</h1>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Actividad</th>
              <th>Inicio</th>
              <th>Fin</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((clase) => (
              <tr key={clase.id}>
                <td>{new Date(clase.fecha_clase).toLocaleDateString()}</td>
                <td>{clase.tipo_clase}</td>
                <td>{clase.actividad}</td>
                <td>{clase.turno_inicio}</td>
                <td>{clase.turno_fin}</td>
                <td>{clase.dictada ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
    );
  };
  
export default InstructorDashboard; 