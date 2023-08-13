export default function UserPreferenceHelpModal() {
    return (
        <div className="modal fade" id="helpModal" role="dialog" aria-labelledby="helpModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">Help</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <p><em>Empty Fridge</em> is a recipe idea generator that gives you recipe ideas based on your preferences and ingredients you have on-hand or ingredients you'd like to cook with.</p><p>It uses AI (Open AI's <a href="https://platform.openai.com/docs/api-reference/chat/object">ChatGPT</a>) to come up with recipe ideas based on your inputs.</p><p>Simply input up to 5 preferences (cuisines, spice-level, diet-specific, etc) and up to 20 ingredients you'd like to get ideas for and let <em>Empty Fridge</em> come up with suggestions for you.</p><p>Note that every <i>Find Recipe</i> selection returns 3 recipes. Feel free to use the same preferences and ingredients for more ideas.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
        </div>
    )
  }