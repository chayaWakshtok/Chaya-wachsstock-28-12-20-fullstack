using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApplication1.Controllers
{

    [RoutePrefix("api/Favorite")]
    public class FavoriteController : ApiController
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        [HttpGet]
        [Route("GetFavorites")]
        public IHttpActionResult GetFavorites(string ip)
        {
            try
            {
                return Ok( _favoriteService.GetFavorites(ip));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error getting Favorites : {ex.Message}");
            }

        }


        [HttpPost]
        [Route("AddFavorite")]
        public IHttpActionResult AddFavorite([FromBody] Favorite favorite  )
        {
            try
            {
              return Ok( _favoriteService.AddFavorite(favorite));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Add Favorite : {ex.Message}");
            }
        }


        [HttpDelete]
        [Route("DeleteFavorite")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                return Ok(_favoriteService.RemoveFavorite(id));
            }
            catch (Exception ex)
            {
                return BadRequest($"Error Remove Favorite id: {id},: {ex.Message}");
            }
        }
    }
}
