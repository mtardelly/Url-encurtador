export default function index() {

  
    return (

        <div className="index">
         <h1> URL Shrinker</h1>
             <form action="" method="POST">
                <label for = "fullUrl">Url</label>
                <input type= "url" name ="fullUrl" id="fullUrl"/>
                <button type="submit">Shrink</button>
             </form> 
             <table>
                 <thead>
                    <tr>
                        <th>Full URL</th>
                        <th>Short URL</th>
                        <th>Date URL</th>
                    </tr>
                 </thead>
                 <tbody>
                     <tr>
                         <td><a href="https://courses.webdevsimplified.com">https://courses.webdevsimplified.com</a></td>
                         <td><a href="/123456">123456</a></td>
                         <td>28/08/2001</td>
                     </tr>
                 </tbody>
             </table>
        </div>

    );
  }
  