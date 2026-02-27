const MapArea = () => {
  return (
    <>
      <div className="map-area-section section-padding pt-0 fix">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div className="map-area">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.2816232260616!2d77.3238748755121!3d28.64539837565725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfb5e5c63d8d9%3A0x5c2bff7a59b1b1a!2sEDM%20Mall!5e0!3m2!1sen!2sin!4v1707319412345"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EDM Mall Delhi NCR Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapArea;
